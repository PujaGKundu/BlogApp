import React, { useState } from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router";
import validate from "../utils/validate";

function NewPost(props) {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [body, setBody] = useState("");
  let [tagList, setTagList] = useState("");
  let [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });

  const handleTitle = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setTitle(value);
    setErrors(errors);
  };

  const handleDescription = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setDescription(value);
    setErrors(errors);
  };

  const handleBody = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setBody(value);
    setErrors(errors);
  };

  const handleTagList = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setTagList(value);
    setErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(articlesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(",").map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot create article");
        }
        return res.json();
      })
      .then(({ article }) => {
        setBody("");
        setDescription("");
        setTagList("");
        setTitle("");
        props.history.push("/");
      })
      .catch((errors) => setErrors(errors));
  };

  return (
    <form className="post" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitle}
        placeholder="Article Title"
        className={errors.title && "error"}
      />
      <span className="error">{errors.title}</span>
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleDescription}
        placeholder="What's this article about?"
        className={errors.description && "error"}
      />
      <span className="error">{errors.about}</span>
      <textarea
        name="body"
        rows="5"
        value={body}
        onChange={handleBody}
        placeholder="Write your article (in markdown)"
        className={errors.body && "error"}
      />
      <span className="error">{errors.body}</span>
      <input
        type="text"
        name="tagList"
        value={tagList}
        onChange={handleTagList}
        placeholder="Enter TagList"
        className={errors.tagList && "error"}
      />
      <span className="error">{errors.tagList}</span>
      <button onClick={handleSubmit} className="submit" type="submit">
        Publish Article
      </button>
    </form>
  );
}

export default withRouter(NewPost);
