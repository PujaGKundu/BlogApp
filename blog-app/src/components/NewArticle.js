import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router-dom";

class NewArticle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: "",
      error: "",
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    let { title, description, body, tags } = this.state;
    let token = "Bearer " + localStorage.token;
    event.preventDefault();
    if (title && description && body && tags) {
      fetch(articlesURL, {
        method: "POST",
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
          this.props.history.push("/articles");
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            title: "",
            description: "",
            body: "",
            tags: "",
            error: "",
          });
        });
    } else {
      this.setState({
        title: "",
        description: "",
        body: "",
        tags: "",
        error: "Enter all fields",
      });
    }
  };

  render() {
    let { title, description, body, tags, error } = this.state;
    return (
      <main>
        <section className="pt-20 px-8">
          <form
            className="w-full md:w-1/2 md:mx-auto p-8 border border-gray-400 rounded-md"
            onSubmit={this.handleSubmit}
          >
            <legend className="text-2xl sm:text-3xl text-center font-bold my-3">
              Add Article
            </legend>
            <fieldset className="">
              <span className="text-red-500 my-1">{error}</span>

              <input
                type="text"
                value={title}
                placeholder="Title"
                name="title"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />

              <input
                type="text"
                value={description}
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />

              <textarea
                rows="6"
                value={body}
                name="body"
                placeholder="Articles's Body"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              ></textarea>

              <input
                type="text"
                value={tags}
                name="tags"
                placeholder="Tag List(comma seperated)"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />

              <input
                type="submit"
                value="Add Article"
                className="my-2 p-2 rounded-md outline-none bg-blue-500 hover:bg-blue-400 text-white w-full"
              />
            </fieldset>
          </form>
        </section>
      </main>
    );
  }
}

export default withRouter(NewArticle);
