import React, { useState, useEffect } from "react";
import { tagsURL } from "../utils/constant";
import Loader from "./Loader";

function Tags(props) {
  let [allTags, setAllTags] = useState([]);
  let [error, setError] = useState("");

  useEffect(() => {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        setAllTags(tags.filter((tag) => Boolean(tag)));
      })
      .catch((err) => {
        setError("Not able to fetch Tags");
      });
  });

  if (error) {
    return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
  }
  if (!allTags) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap bg-gray-200 px-4 py-8 rounded-md">
      {allTags.map((tag) => {
        return (
          <span
            key={tag}
            className={
              "bg-gray-700 p-2 cursor-pointer text-white text-xs rounded-md mx-1 my-1" +
              (props.tagSelected === tag ? " bg-red-500" : "")
            }
            onClick={(e) => props.selectTag(e)}
            data-value={tag}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

export default Tags;
