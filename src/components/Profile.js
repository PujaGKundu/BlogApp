import React, { useState, useEffect, useContext } from "react";
import Loader from "./Loader";
import { profileURL } from "../utils/constant";
import { articlesURL } from "../utils/constant";
import Articles from "./Articles";
import Pagination from "./Pagination";
import { withRouter } from "react-router-dom";
import UserContext from "../context/userContext";

function Profile(props) {
  let context = useContext(UserContext);

  let [articles, setArticles] = useState(null);
  let [error, setError] = useState("");
  let [user, setUser] = useState("");
  let [articlesCount, setArticlesCount] = useState(null);
  let [articlesPerPage, setArticlesPerPage] = useState(10);
  let [activePage, setActivePage] = useState(1);
  let [feedSelected, setFeedSelected] = useState("author");
  let [following, setFollowing] = useState("");

  useEffect(() => {
    if (user) {
      let { id } = props.match.params;
      if (user.username !== id) {
        getUserInfo();
      }
      getUserInfo();
    }
  });

  const getUserInfo = () => {
    let { id } = props.match.params;
    fetch(profileURL + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        console.log(res.ok);
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ profile }) => {
        setUser(profile);
        setFollowing(profile.following);
        getArticles();
      })
      .catch((err) => setError(err));
  };

  const handleFollow = () => {
    let { username } = user;
    let method = following ? "DELETE" : "POST";
    fetch(profileURL + "/" + username + "/follow", {
      method: method,
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject();
          });
        }
        return res.json();
      })
      .then(({ profile }) => {
        setFollowing(profile.following);
      })
      .catch((err) => setError(err));
  };

  const handleClick = ({ target }) => {
    let { id } = target.dataset;
    setActivePage(id);
    getArticles();
  };

  const getArticles = () => {
    let { username } = user;
    let offset = (activePage - 1) * 10;

    fetch(
      `${articlesURL}?${feedSelected}=${username}&limit=${articlesPerPage}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      })
      .catch((err) => {
        setError("Not able to fetch Articles");
      });
  };

  const handleFavorite = ({ target }) => {
    let { id, slug } = target.dataset;
    let method = id === "false" ? "POST" : "DELETE";
    fetch(articlesURL + "/" + slug + "/favorite", {
      method: method,
      headers: {
        Authorization: "Token " + localStorage.token,
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
        getArticles();
      })
      .catch((err) => setError(err));
  };

  if (!user) {
    return <Loader />;
  }

  let { username, image, bio } = user;
  let loggenInUser = context.data.user.username;

  return (
    <main>
      <section>
        <div className="bg-articlePage text-white py-16 text-center">
          <img
            src={image}
            alt={username}
            className="w-40 h-40 rounded-full mx-auto"
          />
          <h2 className="text-2xl sm:text-3xl md:text-5xl my-4">{username}</h2>
          <h3 className="sm:text-lg md:text-2xl text-pink-300">{bio}</h3>
          <button
            className={
              loggenInUser !== username
                ? "bg-white text-gray-700 px-8 py-3 rounded-md mt-6"
                : "hidden"
            }
            onClick={handleFollow}
          >
            {following ? `Unfollow ${username}` : `Follow ${username}`}{" "}
          </button>
        </div>

        <article className="px-8 sm:px-12 md:px-40">
          <div className="py-12">
            <span
              className={
                "cursor-pointer text-md sm:text-xl" +
                (feedSelected === "author"
                  ? " text-green-500 pb-2 border-b-2 border-green-500"
                  : "")
              }
              onClick={() => {
                setFeedSelected("author");
                setActivePage(1);
                getArticles();
              }}
            >
              <i className="fas fa-newspaper mr-2"></i>
              My Articles
            </span>
            <span className="mx-4">/</span>
            <span
              className={
                "cursor-pointer text-md sm:text-xl" +
                (feedSelected === "favorited"
                  ? " text-green-500 pb-2 border-b-2 border-green-500"
                  : "")
              }
              onClick={() => {
                setFeedSelected("favorited");
                setActivePage(1);
                getArticles();
              }}
            >
              <i className="fas fa-newspaper mr-2"></i>
              Favorited
            </span>
          </div>
          <div className="">
            <Articles
              articles={articles}
              error={error}
              isLoggedIn={context.isLoggedIn}
              handleFavorite={handleFavorite}
            />
          </div>
        </article>
        <div className="text-center py-8">
          <Pagination
            articlesCount={articlesCount}
            articlesPerPage={articlesPerPage}
            activePage={activePage}
            handleClick={handleClick}
          />
        </div>
      </section>
    </main>
  );
}

export default withRouter(Profile);
