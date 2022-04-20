import Articles from "./Articles";
import React from "react";
import { articlesURL } from "../utils/constant";

class ProfileNav extends React.Component {
  state = {
    activeTab: "author",
    articles: [],
  };

  fetchData = () => {
    fetch(articlesURL + `/?${this.state.activeTab}=${this.props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot fetch data for specified user");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles!" });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleActive = (tab) => {
    this.setState({ activeTab: tab }, () => {
      this.fetchData();
    });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="container">
        <div className="article-heading">
          <div className="flex">
            <button
              onClick={() => this.handleActive("author")}
              className={activeTab === "author" && "active"}
            >
              My Articles
            </button>
            <button
              onClick={() => this.handleActive("favourited")}
              className={activeTab === "favourited" && "active"}
            >
              Favourite Articles
            </button>
          </div>
          <hr />
          <Articles articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default ProfileNav;
