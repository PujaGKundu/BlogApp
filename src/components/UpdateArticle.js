import React, { useState, useEffect } from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";

function UpdateArticle(props) {
  let [article, setArticle] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [body, setBody] = useState("");
  let [tags, setTags] = useState("");
  let [error, setError] = useState("");

  useEffect(() => {
    getArticle();
  });

  const getArticle = () => {
    fetch(articlesURL + `/${props.match.params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ article }) => {
        let { title, description, tagList, body } = article;

        setArticle(article);
        setTitle(title);
        setBody(body);
        setDescription(description);
        setTags({ tags: tagList.join(",") });
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleTitle = ({ target }) => {
    let { name, value } = target;
    setTitle(value);
  };

  const handleDescription = ({ target }) => {
    let { name, value } = target;
    setDescription(value);
  };

  const handleBody = ({ target }) => {
    let { name, value } = target;
    setBody(value);
  };

  const handleTags = ({ target }) => {
    let { name, value } = target;
    setTags(value);
  };

  const handleSubmit = (event) => {
    let token = "Bearer " + localStorage.token;
    event.preventDefault();
    if (title && description && body && tags) {
      fetch(articlesURL + "/" + props.match.params.slug, {
        method: "PUT",
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList: tags.split(",").map((tag) => tag.trim()),
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
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
          props.history.push(`/articles/${props.match.params.slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Enter all fields");
    }
  };

  if (!article) {
    return <Loader />;
  }
  return (
    <main>
      <section className="pt-20">
        <form
          className="w-1/2 mx-auto p-8 border border-gray-400 rounded-md"
          onSubmit={handleSubmit}
        >
          <legend className="text-3xl text-center font-bold my-3">
            Update Article
          </legend>
          <fieldset className="flex flex-col">
            <span className="text-red-500 my-1">{error}</span>
            <input
              type="text"
              value={title}
              placeholder="Title"
              name="title"
              onChange={handleTitle}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />

            <input
              type="text"
              value={description}
              name="description"
              placeholder="Description"
              onChange={handleDescription}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />

            <textarea
              rows="6"
              value={body}
              name="body"
              placeholder="Articles's Body"
              onChange={handleBody}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            ></textarea>

            <input
              type="text"
              value={tags}
              name="tags"
              placeholder="Tag List(comma seperated)"
              onChange={handleTags}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500"
            />

            <input
              type="submit"
              value="Update Article"
              className="my-2 p-2 rounded-md outline-none bg-blue-500 hover:bg-blue-400 text-white "
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default withRouter(UpdateArticle);
