import React from "react";
import { Link, withRouter } from "react-router-dom";
import { validate } from "../utils/validate";
import { registerURL } from "../utils/constant";
import UserContext from "../context/userContext";

class Signup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      passwd: "",
      errors: {
        username: "",
        passwd: "",
        email: "",
      },
    };
  }
  static contextType = UserContext;
  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let { username, passwd, email, errors } = this.state;
    event.preventDefault();
    if (username && passwd && email) {
      fetch(registerURL, {
        method: "POST",
        body: JSON.stringify({ user: { username, password: passwd, email } }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              for (let key in data.errors) {
                errors[key] = `${key} ${data.errors[key]}`;
              }
              return Promise.reject(errors);
            });
          }

          return res.json();
        })
        .then((data) => {
          this.props.history.push("/login");
        })
        .catch((err) =>
          this.setState({ passwd: "", email: "", username: "", errors })
        );
    }
  };

  render() {
    let { username, passwd, email } = this.state.errors;
    // let {info} = this.state;

    return (
      <main>
        <section className="mt-20 px-8">
          <form
            className="w-full md:w-1/3 mx-auto border border-gray-400 p-6 rounded-md"
            onSubmit={this.handleSubmit}
          >
            <div className="text-center">
              <legend className="text-2xl font-bold">Sign Up</legend>
              <Link to="/login">
                <span className="text-blue-700 text-lg text-center">
                  Have an account?{" "}
                </span>
              </Link>
            </div>
            <fieldset className="my-3">
              {/* <span className="text-red-500">{info}</span> */}
              <input
                className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
                type="text"
                placeholder="Enter Username"
                value={this.state.username}
                name="username"
                onChange={(e) => this.handleChange(e)}
              />
              <span className="text-red-500">{username}</span>

              <input
                className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
                type="text"
                placeholder="Enter Email"
                value={this.state.email}
                name="email"
                onChange={(e) => this.handleChange(e)}
              />
              <span className="text-red-500">{email}</span>

              <input
                className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
                type="password"
                placeholder="Enter Password"
                value={this.state.passwd}
                name="passwd"
                onChange={(e) => this.handleChange(e)}
              />
              <span className="text-red-500">{passwd}</span>

              <input
                type="submit"
                value="Sign Up"
                className="block w-full my-6 py-2 px-3 bg-blue-500 text-white font-bold cursor-pointer"
                disabled={username || email || passwd}
              />
            </fieldset>
          </form>
        </section>
      </main>
    );
  }
}

export default withRouter(Signup);
