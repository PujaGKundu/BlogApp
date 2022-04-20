import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import React from "react";
import { userURL } from "../utils/constant";
import FullPageLoader from "./FullPageLoader";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import ErrorBoundary from "./ErrorBoundary";
import { UserProvider } from "../context/userContext";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: false,
      user: "",
      loading: true,
    };
  }
  //check a user is logged in or not
  componentDidMount() {
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
          console.log(data, "data");
          this.handleUser(data.user);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ loading: false });
    }
  }

  //update the state when user is logged in
  handleUser = (user) => {
    this.setState({ isLoggedIn: true, user, loading: false });
    localStorage.setItem("token", user.token);
  };
  //handle logout
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    if (this.state.loading) {
      return <FullPageLoader />;
    }

    return (
      <Router>
        <UserProvider
          value={{
            data: this.state,
            handleUser: this.handleUser,
            handleLogout: this.handleLogout,
          }}
        >
          <ErrorBoundary>
            <Header />
            {this.state.isLoggedIn ? (
              <AuthenticatedApp />
            ) : (
              <UnauthenticatedApp />
            )}
          </ErrorBoundary>
        </UserProvider>
      </Router>
    );
  }
}

export default App;
