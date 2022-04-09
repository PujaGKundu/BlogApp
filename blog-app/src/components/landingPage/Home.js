import React from "react";
import HomeMain from "./home/HomeMain";
import { Route } from "react-router-dom";
import SingleArticle from "./home/SingleArticle";
import NewArticle from "./home/NewArticle";
import Settings from "./home/Settings";
import Profile from "./home/Profile";

import UpdateArticle from "./home/UpdateArticle";

function Home(props) {
  return (
    <>
      <Route path="/" exact>
        <section className="hero-sec  ">
          <div className="container">
            <h1>Conduit</h1>
            <h2 className="sec-heading">A place to share your knowledge!</h2>
          </div>
        </section>

        <HomeMain />
      </Route>

      <Route path="/articles" exact>
        <NewArticle />
      </Route>

      <Route path="/settings" exact>
        <Settings />
      </Route>

      <Route path="/profile/:username">
        <Profile />
      </Route>

      <Route path="/article/:slug/edit">
        <UpdateArticle />
      </Route>

      <Route path="/articles/:slug">
        <SingleArticle />
      </Route>
    </>
  );
}

export default Home;
