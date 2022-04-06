import React from "react";
import { userVerifyURL } from "../utils/constant";
import { withRouter } from "react-router";

class Settings extends React.Component {
  state = {
    user: null,
  };

  handleSubmit = (event) => {
    fetch(userVerifyURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({ user });
      });
  };

  //updateUserData
  updateUserData = (event) => {
    event.preventDefault();

    let data = {
      user: {
        image: event.target.image.value,
        username: event.target.username.value,
        bio: event.target.bio.value,
      },
    };

    fetch(userVerifyURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({ user: { user } });
        this.props.history.push("/");
      });
  };

  handleFormChange = (target, field) => {
    this.setState({
      user: {
        user: {
          [field]: target.value,
        },
      },
    });
  };

  handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    let user = this.props.user;
    return (
      <>
        <div className="container">
          <div>
            <form
              onSubmit={(event) => {
                this.updateUserData(event);
              }}
            >
              <h1>Your Settings</h1>
              <input
                type="url"
                name="image"
                value={this.state.image}
                onChange={(event) => {
                  this.handleFormChange(event.target, "image");
                }}
                placeholder="URL of profile picture"
              />
              <input
                type="text"
                name="username"
                value={user.username}
                placeholder="Username"
                disabled
              />
              <textarea
                name="bio"
                rows="7"
                value={this.state.bio}
                onChange={(event) => {
                  this.handleFormChange(event.target, "bio");
                }}
                placeholder="Short bio about you"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter Email"
                disabled
              />
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="New Password"
                disabled
              />
              <button className="submit" type="submit">
                Update Settings
              </button>
            </form>
          </div>
          <div className="mr-bottom">
            <hr align="center" width="800px" />
            <button
              className="logout"
              type="submit"
              onClick={this.handleLogOut}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Settings);
