import Loader from "./Loader";
import React from "react";
import Header from "./Header";
import { articlesURL } from "../utils/constant";

class IndivisualArticle extends React.Component {
  state = {
    article: null,
    error: "",
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          article: data.article,
          error: "",
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles!" });
      });
  }
  render() {
    if (!this.state.article) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    }

    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }

    let { article } = this.state;

    return (
      <>
        <Header />
        <main>
          <div className="article-hero">
            <div className="container">
              <h1>{article.title}</h1>
              <div className="flex jc-start al-center">
                <img src={article.author.image} alt="icon"></img>
                <div>
                  <h3>{article.author.username}</h3>
                  <p className="date">{article.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <p className="single-article">{article.body}</p>
            <ul className="flex jc-start">
              {article.tagList.map((tag, i) => (
                <li key={i} className="taglist">
                  {tag}
                </li>
              ))}
            </ul>
            <hr />
            <h6 className="flex">
              <p>Sign up </p>&nbsp; or &nbsp;<p>Sign in</p>&nbsp; to add
              comments on this article.
            </h6>
          </div>
        </main>
      </>
    );
  }
}

export default IndivisualArticle;
