import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };

    validate(errors, name, value);

    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    let { email, password } = this.state.errors;
    return (
      <div className="container">
        <Header />
        <h1>Sign in</h1>
        <NavLink activeClassName="account-color" to="/signup">
          <h3 className="account">Need an account?</h3>
        </NavLink>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
            className={email && "error"}
          />
          <span className="error">{email}</span>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
            className={password && "error"}
          />
          <span className="error">{password}</span>
          <button className="submit" type="submit" disabled={email || password}>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
