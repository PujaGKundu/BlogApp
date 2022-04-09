import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Register_URL } from "../../utils/constants";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: null,
        username: null,
        password: null,
        errors: {
          email: null,
          username: null,
          password: null,
        },
      },
    };
  }

  handleUserRegistration = (event) => {
    event.preventDefault();
    let data = {
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
    };

    fetch(Register_URL, {
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
      .then((userData) => {
        this.setState({
          data: {
            email: "",
            username: "",
            password: "",
            errors: {
              email: null,
              username: null,
              password: null,
            },
          },
        });
        this.props.history.push("/users/login");
      })
      .catch((errors) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            data: {
              errors: errors,
            },
          };
        });
      });
  };

  handleSignUpError = (target, field) => {
    switch (field) {
      case "email":
        if (target.value.length < 8 || !target.value.includes("@")) {
          this.setState({
            data: {
              errors: {
                email: "Email must be 8 char long and include @ symbol",
              },
            },
          });
        } else {
          this.setState({
            data: {
              errors: {
                email: null,
              },
            },
          });
        }
        break;

      case "username":
        if (target.value.length < 5) {
          this.setState({
            data: {
              errors: {
                username: "username must be 5 char long ",
              },
            },
          });
        } else {
          this.setState({
            data: {
              errors: {
                username: null,
              },
            },
          });
        }
        break;

      case "password":
        if (target.value.length < 8) {
          this.setState({
            data: {
              errors: {
                password: "Password must be 8 char long ",
              },
            },
          });
        } else {
          this.setState({
            data: {
              errors: {
                password: null,
              },
            },
          });
        }
        break;

      default:
        break;
    }
  };

  render() {
    let { username, email, password } = this.state.data.errors;

    return (
      <div className="container">
        <h1>Sign Up</h1>
        <NavLink activeClassName="account-color" to="/users/login">
          <h3 className="account">Have an account?</h3>
        </NavLink>
        <form
          onSubmit={(event) => {
            this.handleUserRegistration(event);
          }}
        >
          <input
            type="text"
            name="username"
            onChange={(event) => {
              this.handleSignUpError(event.target, "username");
            }}
            placeholder="Your name"
            className={username && "error"}
          />
          <span className="error">{username}</span>

          <input
            type="email"
            name="email"
            onChange={(event) => {
              this.handleSignUpError(event.target, "email");
            }}
            placeholder="Email"
            className={email && "error"}
          />
          <span className="error">{email}</span>

          <input
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            onChange={(event) => {
              this.handleSignUpError(event.target, "password");
            }}
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
