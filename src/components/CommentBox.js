import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/userContext";
import { articlesURL } from "../utils/constant";
import Comments from "./Comments";

function CommentBox(props) {
  let context = useContext(UserContext);

  let [inputText, setInputText] = useState("");
  let [comments, setComments] = useState("");

  useEffect(() => {
    getComments();
  });

  const handleChange = ({ target }) => {
    let { name, value } = target;
    setInputText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let slug = props.slug;
    if (inputText) {
      fetch(articlesURL + "/" + slug + "/comments", {
        method: "POST",
        body: JSON.stringify({ comment: { body: inputText } }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
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
          setInputText("");
          setComments("");
          getComments();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = ({ target }) => {
    let { id } = target.dataset;
    let slug = props.slug;
    fetch(articlesURL + "/" + slug + "/comments/" + id, {
      method: "DELETE",
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
        setComments("");
        getComments();
      })
      .catch((err) => console.log(err));
  };

  const getComments = () => {
    let slug = props.slug;
    fetch(articlesURL + "/" + slug + "/comments")
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comments }) => {
        setComments(comments);
      })
      .catch((err) => console.log(err));
  };

  let { isLoggedIn } = context.data;

  return (
    <>
      <div className={isLoggedIn ? "" : "hidden"}>
        <form className="my-6 w-full" onSubmit={handleSubmit}>
          <textarea
            className="w-full border-2 border-gray-400 rounded-md p-3 outline-none focus:border-blue-500"
            rows="6"
            placeholder="Enter Comments"
            value={inputText}
            onChange={handleChange}
            name="inputText"
          ></textarea>
          <input
            type="submit"
            value="Add Comment"
            className="bg-blue-500 w-min self-end my-4 py-2 px-4 text-white rounded-md cursor-pointer hover:bg-blue-400"
          />
        </form>
      </div>
      <div className="my-8">
        <Comments comments={comments} handleDelete={handleDelete} />
      </div>
    </>
  );
}

export default CommentBox;
