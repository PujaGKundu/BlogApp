import React from "react";
import UserContext from "../context/userContext";
import { articlesURL } from "../utils/constant";
import Comments from "./Comments";

class CommentBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputText: "",
      comments: "",
    };
  }

  static contextType = UserContext;
  componentDidMount() {
    this.getComments();
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let slug = this.props.slug;
    let { inputText } = this.state;
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
          console.log(data);
          this.setState({ inputText: "", comments: "" }, this.getComments);
        })
        .catch((err) => console.log(err));
    }
  };

  handleDelete = ({ target }) => {
    let { id } = target.dataset;
    console.log(typeof id);
    let slug = this.props.slug;
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
        this.setState({ comments: "" }, this.getComments);
      })
      .catch((err) => console.log(err));
  };

  getComments = () => {
    let slug = this.props.slug;
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
        console.log(comments);
        this.setState({ comments });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { inputText, comments } = this.state;
    let loggedInUser = this.context.data.user.username;
    console.log(loggedInUser, "user");
    let { isLoggedIn } = this.context.data;
    return (
      <>
        <div className={isLoggedIn ? "" : "hidden"}>
          <form className="my-6 w-full" onSubmit={this.handleSubmit}>
            <textarea
              className="w-full border-2 border-gray-400 rounded-md p-3 outline-none focus:border-blue-500"
              rows="6"
              placeholder="Enter Comments"
              value={inputText}
              onChange={this.handleChange}
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
          <Comments comments={comments} handleDelete={this.handleDelete} />
        </div>
      </>
    );
  }
}

export default CommentBox;
