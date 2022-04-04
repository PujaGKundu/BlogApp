import Home from "./Home";
import Header from "./Header";
import SignUp from "./SignUp";
import Login from "./Login";
import IndivisualArticle from "./IndivisualArticle";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
  }
  componentDidMount() {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`)
      .then((res) => res.json())
      .then((article) => {
        this.setState({ article });
      });
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact>
          <Header />
          <Home article={this.state.article} />
        </Route>
        <Route path="/signin" exact>
          <Header />
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Header />
          <SignUp />
        </Route>
        <Route path="/article/:slug" component={IndivisualArticle} />
        <Route path="/:tagList" component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
