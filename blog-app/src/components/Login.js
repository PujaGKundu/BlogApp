import React from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";
import { loginURL } from "../utils/constant";
import { withRouter } from "react-router";

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
    const { email, password } = this.state;
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
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
        this.props.history.push("/");
      })
      .catch((errors) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: "Email or password is incorrect!",
            },
          };
        })
      );
  };

  render() {
    let { email, password } = this.state.errors;
    return (
      <div className="container">
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

export default withRouter(Login);
