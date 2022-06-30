import Articles from "./Articles";
import React, { useState, useEffect } from "react";
import { articlesURL } from "../utils/constant";

function ProfileNav(props) {
  let [activeTab, setActiveTab] = useState("author");
  let [articles, setArticles] = useState([]);
  let [error, setError] = useState("");

  const fetchData = () => {
    fetch(articlesURL + `/?${activeTab}=${props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot fetch data for specified user");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError("Not able to fetch articles!");
      });
  };

  useEffect(() => {
    fetchData();
  });

  const handleActive = (tab) => {
    setActiveTab(tab);
    fetchData();
  };

  return (
    <div className="container">
      <div className="article-heading">
        <div className="flex">
          <button
            onClick={() => handleActive("author")}
            className={activeTab === "author" && "active"}
          >
            My Articles
          </button>
          <button
            onClick={() => handleActive("favourited")}
            className={activeTab === "favourited" && "active"}
          >
            Favourite Articles
          </button>
        </div>
        <hr />
        <Articles articles={articles} />
      </div>
    </div>
  );
}

export default ProfileNav;
