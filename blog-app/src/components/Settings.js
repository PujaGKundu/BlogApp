import React from "react";
import { validate } from "../utils/validate";
import { userURL } from "../utils/constant";
import { withRouter } from "react-router-dom";
import UserContext from "../context/userContext";
import Loader from "./Loader";
class Settings extends React.Component {
  constructor(props) {
    super();
    this.state = {
      image: "",
      username: "",
      email: "",
      passwd: "",
      bio: "",
      errors: {
        username: "",
        email: "",
        passwd: "",
      },
    };
  }
  static contextType = UserContext;
  componentDidMount() {
    let { image, username, email, bio } = this.context.data.user;
    this.setState({ image, username, email, bio });
  }
  handleChange = ({ target }) => {
    let { name, value } = target;
    let { errors } = this.state;
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let { username, image, passwd, email, bio, errors } = this.state;
    event.preventDefault();
    if (username && image && passwd && email && bio) {
      fetch(userURL, {
        method: "PUT",
        body: JSON.stringify({
          user: {
            username,
            email,
            password: passwd,
            bio,
            image:
              "https://pbs.twimg.com/profile_images/1368973967025836036/yIJ1QI8o_400x400.jpg",
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            return res.json().then((data) => {
              for (let key in data.errors) {
                errors[key] = `${key} ${data.errors[key]}`;
              }
              return Promise.reject({ errors });
            });
          }
          return res.json();
        })
        .then((data) => {
          this.context.handleUser(data.user);
          this.props.history.push(`/profiles/${data.user.username}`);
        })
        .catch((err) => this.setState({ errors }));
    }
  };

  render() {
    if (
      !this.state.username &&
      !this.state.email &&
      !this.state.image &&
      !this.state.bio
    ) {
      return <Loader />;
    }
    let { username, email, passwd } = this.state.errors;
    return (
      <main className="">
        <section className="pt-20 px-8">
          <form
            className="w-full md:w-1/2 md:mx-auto p-8 border border-gray-400 rounded-md"
            onSubmit={this.handleSubmit}
          >
            <legend className="text-center text-2xl sm:text-3xl my-2 font-bold">
              Settings
            </legend>
            <fieldset className="">
              <input
                type="text"
                placeholder="Image Url"
                value={this.state.image}
                onChange={this.handleChange}
                name="image"
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />

              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />
              <span className="my-1 text-red-500">{username}</span>

              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />
              <span className="my-1 text-red-500">{email}</span>

              <input
                type="password"
                name="passwd"
                value={this.state.passwd}
                placeholder="Password"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              />
              <span className="my-1 text-red-500">{passwd}</span>

              <textarea
                value={this.state.bio}
                rows="6"
                name="bio"
                placeholder="Enter your Bio"
                onChange={this.handleChange}
                className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
              ></textarea>

              <input
                type="submit"
                value="Update"
                className="my-2 p-2 rounded-md outline-none bg-blue-500 hover:bg-blue-400 text-white w-full"
              ></input>
            </fieldset>
          </form>
        </section>
      </main>
    );
  }
}

export default withRouter(Settings);
