import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router";
import validate from "../utils/validate";

class NewPost extends React.Component {
  state = {
    title: "",
    description: "",
    body: "",
    tagList: "",
    errors: {
      title: "",
      description: "",
      body: "",
      tagList: "",
    },
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };

    validate(errors, name, value);

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    fetch(articlesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
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
        this.setState({ title: "", description: "", body: "", tagList: "" });
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { errors, title, description, body, tagList } = this.state;
    return (
      <form className="post" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleInput}
          placeholder="Article Title"
          className={errors.title && "error"}
        />
        <span className="error">{errors.title}</span>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleInput}
          placeholder="What's this article about?"
          className={errors.description && "error"}
        />
        <span className="error">{errors.about}</span>
        <textarea
          name="body"
          rows="5"
          value={body}
          onChange={this.handleInput}
          placeholder="Write your article (in markdown)"
          className={errors.body && "error"}
        />
        <span className="error">{errors.body}</span>
        <input
          type="text"
          name="tagList"
          value={tagList}
          onChange={this.handleInput}
          placeholder="Enter TagList"
          className={errors.tagList && "error"}
        />
        <span className="error">{errors.tagList}</span>
        <button onClick={this.handleSubmit} className="submit" type="submit">
          Publish Article
        </button>
      </form>
    );
  }
}

export default withRouter(NewPost);
