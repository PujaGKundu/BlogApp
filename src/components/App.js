import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import React, { useState, useEffect } from "react";
import { userURL } from "../utils/constant";
import FullPageLoader from "./FullPageLoader";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import ErrorBoundary from "./ErrorBoundary";
import { UserProvider } from "../context/userContext";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [user, setUser] = useState("");
  let [loading, setLoading] = useState(true);

  //check a user is logged in or not
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      let bearer = "Bearer " + token;
      fetch(userURL, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((data) => {
          handleUser(data.user);
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
    }
  }, []);

  //update the state when user is logged in
  const handleUser = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    setLoading(false);
    localStorage.setItem("token", user.token);
  };
  //handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Router>
      <UserProvider
        value={{
          data: { isLoggedIn, user, loading },
          handleUser: handleUser,
          handleLogout: handleLogout,
        }}
      >
        <ErrorBoundary>
          <Header />
          {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </UserProvider>
    </Router>
  );
}

export default App;
