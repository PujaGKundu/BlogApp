import React from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";
import { signupURL } from "../utils/constant";
import { withRouter } from "react-router";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
  }

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };

    validate(errors, name, value);

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    fetch(signupURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: "", password: "", email: "" });
        this.props.history.push("/signin");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { username, email, password } = this.state.errors;

    return (
      <div className="container">
        <h1>Sign Up</h1>
        <NavLink activeClassName="account-color" to="/signin">
          <h3 className="account">Have an account?</h3>
        </NavLink>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            placeholder="Your name"
            className={username && "error"}
          />
          <span className="error">{username}</span>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            placeholder="Email"
            className={email && "error"}
          />
          <span className="error">{email}</span>
          <input
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            value={this.state.password}
            onChange={this.handleInput}
            placeholder="Password"
            className={password && "error"}
          />
          <span className="error">{password}</span>
          <button
            className="submit"
            type="submit"
            disabled={email || password || username}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
