import Home from "./Home";
import Header from "./Header";
import SignUp from "./SignUp";
import Login from "./Login";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Settings from "./Settings";
import NoMatch from "./NoMatch";
import FullPageSpinner from "./FullPageSpinner";
import IndivisualArticle from "./IndivisualArticle";
import { Route, Switch } from "react-router-dom";
import { localStorageKey, userVerifyURL } from "../utils/constant";
import React from "react";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount() {
    let key = localStorage[localStorageKey];
    if (key) {
      fetch(userVerifyURL, {
        method: "GET",
        headers: {
          authorization: `Token ${key}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp user={this.state.user} />
        ) : (
          <UnAuthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/article/:slug">
          <IndivisualArticle user={props.user} />
        </Route>
        <Route path="/new-post" exact>
          <NewPost user={props.user} />
        </Route>
        <Route path="/profile" exact>
          <Profile user={props.user} />
        </Route>
        <Route path="/settings" exact>
          <Settings user={props.user} />
        </Route>
        <Route path="*" exact>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

function UnAuthenticatedApp(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin" exact>
          <Login updateUser={props.updateUser} />
        </Route>
        <Route path="/signup" exact>
          <SignUp updateUser={props.updateUser} />
        </Route>
        <Route path="/article/:slug">
          <IndivisualArticle user={props.user} />
        </Route>
        <Route path="*" exact>
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
