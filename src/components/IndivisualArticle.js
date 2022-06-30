import Loader from "./Loader";
import React, { useState, useEffect } from "react";
import { articlesURL } from "../utils/constant";
import { Link } from "react-router-dom";
//import validate from "../utils/validate";
import { withRouter } from "react-router";

function IndivisualArticle(props) {
  let [article, setArticle] = useState("");
  let [error, setError] = useState("");

  useEffect(() => {
    let slug = props.match.params.slug;
    fetch(articlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setArticle(data.article);
        setError("");
      })
      .catch((err) => {
        setError("Not able to fetch articles!");
      });
  });

  if (!article) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="container">{error}</p>;
  }

  return (
    <>
      <main>
        <div className="article-hero">
          <div className="container">
            <h1>{article.title}</h1>
            <div className="flex jc-start al-center">
              <img src={article.author.image} alt="icon"></img>
              <div>
                <h3>{article.author.username}</h3>
                <p className="date">{article.createdAt}</p>
              </div>
              {props.user === null ? (
                ""
              ) : (
                <div className="article-handle">
                  <button className="edit">
                    <i className="fa fa-pencil" aria-hidden="true">
                      Edit Article
                    </i>
                  </button>
                  <button className="delete">
                    <i className="fa fa-trash" aria-hidden="true">
                      Delete Article
                    </i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <p className="single-article">{article.body}</p>
          <ul className="flex jc-start">
            {article.tagList.map((tag, i) => (
              <li key={i} className="taglist">
                {tag}
              </li>
            ))}
          </ul>
          <hr />
          {props.user === null ? (
            <center>
              <h6 className="flex">
                <Link className="link" to="/signup">
                  Sign up{" "}
                </Link>
                &nbsp; or &nbsp;
                <Link className="link" to="/signin">
                  Sign in
                </Link>
                &nbsp; to add comments on this article.
              </h6>
            </center>
          ) : (
            <div>
              <div className="flex jc-center al-center edit-article">
                <img src={article.author.image} alt="icon"></img>
                <div>
                  <h3>{article.author.username}</h3>
                  <p className="date">{article.createdAt}</p>
                </div>
                <div className="article-handle">
                  <button className="edit">
                    <i className="fa fa-pencil" aria-hidden="true">
                      Edit Article
                    </i>
                  </button>
                  <button className="delete">
                    <i className="fa fa-trash" aria-hidden="true">
                      Delete Article
                    </i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default withRouter(IndivisualArticle);
