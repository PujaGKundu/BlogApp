import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";

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
  };

  render() {
    let { username, email, password } = this.state.errors;
    let message = this.state.message;
    return (
      <div className="container">
        <Header />
        <h1>Sign Up</h1>
        <NavLink activeClassName="account-color" to="/signin">
          <h3 className="account">Have an account?</h3>
        </NavLink>
        <form onSubmit={this.handleSubmit}>
          <span className="error">{message}</span>
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

export default SignUp;
