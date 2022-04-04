import React from "react";
import { NavLink } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username = value === "" ? "Enter Username" : "";
        break;
      case "email":
        errors.email = this.validateEmail(value) ? "" : "Email is not valid";
        break;
      case "password":
        errors.password =
          value.length > 5 ? "" : "Password cannot be less than 5 characters";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username && !this.state.email && !this.state.password) {
      this.setState({ message: "Enter valid credentials" });
    } else {
      alert("Signed in successfully");
    }
  };

  render() {
    let { username, email, password } = this.state.errors;
    let message = this.state.message;
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <NavLink activeClassName="account-color" to="/signin">
          <h3 className="account">Have an account?</h3>
        </NavLink>
        <form onSubmit={this.handleSubmit}>
          <span className="error">{message}</span>
          <input
            type="text"
            id="user"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            placeholder="Your name"
            className={username && "error"}
          />
          <span className="error">{username}</span>
          <input
            type="email"
            id="user"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            placeholder="Email"
            className={email && "error"}
          />
          <span className="error">{email}</span>
          <input
            type="password"
            id="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            value={this.state.password}
            onChange={this.handleInput}
            placeholder="Password"
            className={password && "error"}
          />
          <span className="error">{password}</span>
          <button className="submit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
