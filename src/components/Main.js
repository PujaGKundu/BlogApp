import React, { useState, useEffect, useContext } from "react";
import Articles from "./Articles";
import Tags from "./Tags";
import { articlesURL, feedURL } from "../utils/constant";
import Pagination from "./Pagination";
import UserContext from "../context/userContext";

function Main() {
  let context = useContext(UserContext);

  let [articles, setArticles] = useState(null);
  let [error, setError] = useState("");
  let [articlesCount, setArticlesCount] = useState(null);
  let [articlesPerPage, setArticlesPerPage] = useState(10);
  let [activePage, setActivePage] = useState(1);
  let [tagSelected, setTagSelected] = useState("");
  let [feedSelected, setFeedSelected] = useState("");

  useEffect(() => {
    let { isLoggedIn } = context.data;
    if (isLoggedIn) {
      setFeedSelected("myfeed");
      getArticles();
    } else {
      setFeedSelected("global");
      getArticles();
    }
  }, [context]);

  const handleClick = ({ target }) => {
    let { id } = target.dataset;
    setActivePage(id);
    getArticles();
  };

  const getArticles = () => {
    let offset = (activePage - 1) * 10;
    let tag = tagSelected;
    let url =
      feedSelected === "myfeed"
        ? feedURL + `?limit=${articlesPerPage}&offset=${offset}`
        : articlesURL +
          `?limit=${articlesPerPage}&offset=${offset}` +
          (tag && `&tag=${tag}`);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      })
      .catch((err) => {
        setError("Not able to fetch Articles");
      });
  };

  const selectTag = ({ target }) => {
    let { value } = target.dataset;
    setTagSelected(value);
    setActivePage(1);
    setFeedSelected("");
    getArticles();
  };

  const handleFavorite = ({ target }) => {
    let { isLoggedIn } = context.data;
    let { id, slug } = target.dataset;
    let method = id === "false" ? "POST" : "DELETE";
    if (isLoggedIn) {
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
        .catch((err) => console.log(err));
    }
  };

  let { isLoggedIn } = context.data;

  return (
    // Hero section
    <main>
      <section className="px-8 py-12 lg:px-28 lg:py-12">
        {/* feeds part */}
        <div className="flex mb-3 text-xs sm:text-lg lg:text-xl">
          <span
            className={
              !isLoggedIn
                ? "hidden"
                : feedSelected === "myfeed"
                ? "mr-8 cursor-pointer text-green-500 pb-2 border-b-2 border-green-500"
                : " mr-8 cursor-pointer green"
            }
            onClick={() => {
              setActivePage(1);
              setFeedSelected("myfeed");
              setTagSelected("");
              getArticles();
            }}
          >
            {" "}
            <i className="fas fa-newspaper mr-2"></i>
            My feed
          </span>
          <span
            className={
              "cursor-pointer" +
              (feedSelected === "global"
                ? " text-green-500 pb-2 border-b-2 border-green-500"
                : "")
            }
            onClick={() => {
              setTagSelected("");
              setFeedSelected("global");
              setActivePage(1);
              getArticles();
            }}
          >
            <i className="fas fa-newspaper mr-2"></i>
            Global Feed
          </span>
          <div
            className={
              tagSelected ? "visible text-xs sm:text-lg lg:text-xl" : "hidden"
            }
          >
            <span className="mx-4 text-gray-500">/</span>
            <span className="text-green-700 pb-2 border-b-2 border-green-700">
              #{tagSelected}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between py-8">
          {/* articles part */}
          <div className="flex-100 lg:flex-70">
            <Articles
              articles={articles}
              error={error}
              handleFavorite={handleFavorite}
            />
          </div>

          {/* tags part */}
          <div className="flex-100 lg:flex-25">
            <Tags
              selectTag={selectTag}
              {...articles}
              {...error}
              {...articlesCount}
              {...articlesPerPage}
              {...activePage}
              {...tagSelected}
              {...feedSelected}
            />
          </div>
        </div>

        {/* page indicator */}
        <div className="flex justify-center flex-wrap pt-4 py-6">
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

export default Main;
