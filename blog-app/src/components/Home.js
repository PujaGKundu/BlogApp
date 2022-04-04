import Loader from "./Loader";
import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    if (!this.props.article) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    }

    console.log(this.props);

    let articles = this.props.article.articles;

    let tags = articles.reduce((acc, cv) => {
      acc = acc.concat(cv.tagList);
      return acc;
    }, []);

    let tagList = [...new Set(tags)];

    return (
      <>
        <main>
          <div className="hero">
            <h1>conduit</h1>
            <h2>A place to share your knowledge!</h2>
          </div>
          <div className="container">
            <div className="flex jc-between al-start">
              <article className="flex-60">
                <div className="article-heading">
                  <h3>Global Feed</h3>
                </div>
                <div className="articles">
                  {articles.map((article, i) => (
                    <section key={i} className="article">
                      <div className="flex jc-start al-center">
                        <img src={article.author.image} alt="icon"></img>
                        <div>
                          <h3>{article.author.username}</h3>
                          <p className="date">{article.createdAt}</p>
                        </div>
                      </div>
                      <h2>{article.title}</h2>
                      <p className="des">{article.description}</p>
                      <div className="flex jc-between al-center">
                        <Link to={`/article/${article.slug}`}>
                          <button>Read more...</button>
                        </Link>

                        <ul className="flex ">
                          {article.tagList.map((tag, i) => (
                            <li key={i} className="taglist">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr />
                    </section>
                  ))}
                </div>
              </article>
              <article className="flex-30">
                <div className="tags">
                  <h3>Popular Tags</h3>
                  <ul className="flex flex-wrap">
                    {tagList.map((list, i) => {
                      return (
                        <Link activeClassName="tag" key={i} to={`/${list}`}>
                          <li className="tag">{list}</li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Home;
