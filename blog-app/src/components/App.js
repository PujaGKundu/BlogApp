import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import NoMatch from "./NoMatch";
import IndivisualArticle from "./IndivisualArticle";
import { Route, Switch } from "react-router-dom";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signin" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/article/:slug" component={IndivisualArticle} />
          <Route path="*" exact>
            <NoMatch />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
