import React from "react";
import Loader from "./Loader";

import { Link } from "react-router-dom";

function Articles(props) {
  const { articles, error } = props;
  if (error) {
    return <p>{error}</p>;
  }
  if (!articles) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }
  if (articles.length < 1) {
    return <h2>No articles found!</h2>;
  }
  return (
    <div className="articles">
      {articles.map((article) => (
        <section key={article.slug} className="article">
          <div className="flex jc-start al-center">
            <img src={article.author.image} alt={article.author.username}></img>
            <div>
              <h3>{article.author.username}</h3>
              <p className="date">{article.createdAt}</p>
            </div>
          </div>
          <h2>{article.title}</h2>
          <p className="des">{article.description}</p>
          <div className="flex jc-between al-center">
            <Link to={`/article/${article.slug}`}>
              <button>Read more...</button>
            </Link>

            <ul className="flex ">
              {article.tagList.map((tag, i) => (
                <li key={i} className="taglist">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </section>
      ))}
    </div>
  );
}

export default Articles;
