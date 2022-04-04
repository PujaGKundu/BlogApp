import Loader from "./Loader";
import React from "react";
import Header from "./Header";

class IndivisualArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then((article) => {
        this.setState({ article });
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

    let { article } = this.state.article;
    return (
      <>
        <Header />
        <main>
          <div>
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
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default IndivisualArticle;
