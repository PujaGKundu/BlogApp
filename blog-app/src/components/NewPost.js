import React from "react";

class NewPost extends React.Component {
  state = {
    title: "",
    about: "",
    description: "",
    tags: [],
  };

  handleInput = ({ target }) => {
    let { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <form className="post" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
          placeholder="Article Title"
        />
        <input
          type="text"
          name="about"
          value={this.state.about}
          onChange={this.handleInput}
          placeholder="What's this article about?"
        />
        <textarea
          name="description"
          rows="5"
          value={this.state.description}
          onChange={this.handleInput}
          placeholder="Write your article (in markdown)"
        />
        <input
          type="text"
          name="tags"
          value={this.state.tags}
          onChange={this.handleInput}
          placeholder="Enter Tags"
        />
        <button className="submit" type="submit">
          Publish Article
        </button>
      </form>
    );
  }
}

export default NewPost;
