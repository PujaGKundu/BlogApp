import FeedNav from "./FeedNav";
import Banner from "./Banner";
import Articles from "./Articles";
import Pagination from "./Pagination";
import Tags from "./Tags";
import React from "react";

import { articlesURL } from "../utils/constant";

class Home extends React.Component {
  state = {
    articles: null,
    error: "",
    articlesCount: 0,
    articlesPerPage: 10,
    activePage: 1,
    activeTag: "",
  };

  emptyTag = () => {
    this.setState({ activeTag: "" });
  };

  addTag = (value) => {
    this.setState({ activeTag: value });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTag !== this.state.activeTag
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePage - 1) * 10;
    const tag = this.state.activeTag;

    fetch(
      articlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          error: "",
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles!" });
      });
  };

  updateCurrentPAgeIndex = (index) => {
    this.setState({ activePage: index }, this.fetchData);
  };

  render() {
    const {
      articles,
      error,
      articlesCount,
      articlesPerPage,
      activePage,
      activeTag,
    } = this.state;
    return (
      <>
        <main>
          <Banner />
          <div className="container">
            <div className="flex jc-between al-start">
              <article className="flex-60">
                <FeedNav activeTag={activeTag} emptyTag={this.emptyTag} />
                <Articles articles={articles} error={error} />
                <Pagination
                  articlesCount={articlesCount}
                  articlesPerPage={articlesPerPage}
                  activePage={activePage}
                  updateCurrentPAgeIndex={this.updateCurrentPAgeIndex}
                />
              </article>
              <article className="flex-30">
                <div className="tags">
                  <h3>Popular Tags</h3>
                  <Tags addTag={this.addTag} />
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
