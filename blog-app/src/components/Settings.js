import React from "react";

class Settings extends React.Component {
  state = {
    url: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  };

  handleInput = ({ target }) => {
    let { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Your Settings</h1>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleInput}
            placeholder="URL of profile picture"
          />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            placeholder="Username"
          />
          <textarea
            name="bio"
            rows="7"
            value={this.state.bio}
            onChange={this.handleInput}
            placeholder="Short bio about you"
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            placeholder="Enter Email"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            placeholder="New Password"
          />
          <button className="submit" type="submit">
            Update Settings
          </button>
        </form>
        <hr />
        <button className="logout" type="logout">
          Or click here to logout.
        </button>
      </div>
    );
  }
}

export default Settings;
