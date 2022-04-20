import React from "react";
import { Link, withRouter } from "react-router-dom";
import UserContext from "../context/userContext";
import { loginURL } from "../utils/constant";

class Signin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      passwd: "",
      error: "",
    };
  }
  static contextType = UserContext;
  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    let { email, passwd, error } = this.state;
    event.preventDefault();
    if (passwd && email) {
      fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({ user: { password: passwd, email } }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              let key = Object.keys(data.errors);
              error = `${key} ${data.errors[key]} `;
              return Promise.reject(error);
            });
          }
          return res.json();
        })
        .then((data) => {
          this.context.handleUser(data.user);
          this.props.history.push("/articles");
        })
        .catch((err) => this.setState({ passwd: "", email: "", error }));
    }
  };

  render() {
    let { error } = this.state;

    return (
      <main>
        <section className="mt-20 px-8">
          <form
            className="w-full md:w-1/3 mx-auto border border-gray-400 p-6 rounded-md"
            onSubmit={this.handleSubmit}
          >
            <div className="text-center">
              <legend className="text-2xl font-bold">Sign In</legend>
              <Link to="/register">
                <span className="text-blue-700 text-lg text-center">
                  Need an account?{" "}
                </span>
              </Link>
            </div>
            <fieldset className="my-3">
              <span className="text-red-500">{error}</span>
              <input
                className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
                type="text"
                placeholder="Enter Email"
                value={this.state.email}
                name="email"
                onChange={(e) => this.handleChange(e)}
              />

              <input
                className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
                type="password"
                placeholder="Enter Password"
                value={this.state.passwd}
                name="passwd"
                onChange={(e) => this.handleChange(e)}
              />

              <input
                type="submit"
                value="Login In"
                className="block w-full my-6 py-2 px-3 bg-blue-500 text-white font-bold cursor-pointer"
              />
            </fieldset>
          </form>
        </section>
      </main>
    );
  }
}

export default withRouter(Signin);
