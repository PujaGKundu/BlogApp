import React from "react";
import Loader from "./Loader";
import { tagsURL } from "../utils/constant";

class Tags extends React.Component {
  state = {
    tags: null,
    error: "",
  };

  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then(({ tags }) => {
        this.setState({ tags, error: "" });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch tags!" });
      });
  }

  render() {
    const { tags, error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
    if (!tags) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    }

    return (
      <ul className="flex flex-wrap">
        {tags.map((list, i) => {
          return (
            <li key={i} className="tag" onClick={() => this.props.addTag(list)}>
              {list}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Tags;
