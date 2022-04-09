import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Login_URL } from "../../utils/constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        email: "",
        password: "",
      },
      data: { email: "", password: "" },
    };
  }

  handleChange = (event, field) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [field]: event.target.value,
        },
      };
    });
  };

  handleLoginUser = (event) => {
    event.preventDefault();
    let data = {
      email: event.target.email.value,

      password: event.target.password.value,
    };

    fetch(Login_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errors) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((user) => {
        this.props.updateLoggedUser(user);
        this.props.history.push("/");
      })
      .catch((errors) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: errors,
          };
        });
      });
  };

  render() {
    let { email, password } = this.state.errors;
    return (
      <div className="container">
        <h1>Sign in</h1>
        <NavLink activeClassName="account-color" to="/users/signUp">
          <h3 className="account">Need an account?</h3>
        </NavLink>
        <form onSubmit={(event) => this.handleLoginUser(event)}>
          <input
            type="email"
            name="email"
            onChange={(event) => {
              this.handleChange(event, "email");
            }}
            placeholder="Email"
            className={email && "error"}
          />
          <span className="error">{email}</span>

          <input
            type="password"
            name="password"
            onChange={(event) => {
              this.handleChange(event, "password");
            }}
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

export default withRouter(Login);
