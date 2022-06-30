import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";
import { loginURL } from "../utils/constant";
import { withRouter } from "react-router";

function Login(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailChange = (event) => {
    let { name, value } = event.target;
    validate(errors, name, value);

    setEmail(value);
    setErrors(errors);
  };

  const handlePasswordChange = (event) => {
    let { name, value } = event.target;
    validate(errors, name, value);

    setPassword(value);
    setErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        props.updateUser(user);
        props.history.push("/");
      })
      .catch((errors) =>
        setErrors((prevState) => {
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

  return (
    <div className="container">
      <h1>Sign in</h1>
      <NavLink activeClassName="account-color" to="/signup">
        <h3 className="account">Need an account?</h3>
      </NavLink>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className={errors.email && "error"}
        />
        <span className="error">{errors.email}</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className={errors.password && "error"}
        />
        <span className="error">{errors.password}</span>
        <button className="submit" type="submit" disabled={email || password}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
