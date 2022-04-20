import React from "react";
import Articles from "./Articles";
import Tags from "./Tags";
import { articlesURL, feedURL } from "../utils/constant";
import Pagination from "./Pagination";
import UserContext from "../context/userContext";

class Main extends React.Component {
  constructor(props) {
    super();
    this.state = {
      articles: null,
      error: "",
      articlesCount: null,
      articlesPerPage: 10,
      activePage: 1,
      tagSelected: "",
      feedSelected: "",
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    let { isLoggedIn } = this.context.data;
    if (isLoggedIn) {
      this.setState({ feedSelected: "myfeed" }, this.getArticles);
    } else {
      this.setState({ feedSelected: "global" }, this.getArticles);
    }
  }

  handleClick = ({ target }) => {
    let { id } = target.dataset;
    this.setState({ activePage: id }, this.getArticles);
  };

  getArticles = () => {
    let offset = (this.state.activePage - 1) * 10;
    let { feedSelected, tagSelected } = this.state;
    let tag = tagSelected;
    let url =
      feedSelected === "myfeed"
        ? feedURL + `?limit=${this.state.articlesPerPage}&offset=${offset}`
        : articlesURL +
          `?limit=${this.state.articlesPerPage}&offset=${offset}` +
          (tag && `&tag=${tag}`);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch Articles" });
      });
  };

  selectTag = ({ target }) => {
    let { value } = target.dataset;
    this.setState(
      { tagSelected: value, activePage: 1, feedSelected: "" },
      this.getArticles
    );
  };

  handleFavorite = ({ target }) => {
    let { isLoggedIn } = this.context.data;
    let { id, slug } = target.dataset;
    let method = id === "false" ? "POST" : "DELETE";
    if (isLoggedIn) {
      fetch(articlesURL + "/" + slug + "/favorite", {
        method: method,
        headers: {
          Authorization: "Token " + localStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((data) => {
          this.getArticles();
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    let { isLoggedIn } = this.context.data;
    let {
      articles,
      error,
      articlesCount,
      articlesPerPage,
      activePage,
      feedSelected,
      tagSelected,
    } = this.state;
    return (
      // Hero section
      <main>
        <section className="px-8 py-12 lg:px-28 lg:py-12">
          {/* feeds part */}
          <div className="flex mb-3 text-xs sm:text-lg lg:text-xl">
            <span
              className={
                !isLoggedIn
                  ? "hidden"
                  : feedSelected === "myfeed"
                  ? "mr-8 cursor-pointer text-green-500 pb-2 border-b-2 border-green-500"
                  : " mr-8 cursor-pointer green"
              }
              onClick={() => {
                this.setState(
                  { activePage: 1, feedSelected: "myfeed", tagSelected: "" },
                  this.getArticles
                );
              }}
            >
              {" "}
              <i className="fas fa-newspaper mr-2"></i>
              My feed
            </span>
            <span
              className={
                "cursor-pointer" +
                (feedSelected === "global"
                  ? " text-green-500 pb-2 border-b-2 border-green-500"
                  : "")
              }
              onClick={() =>
                this.setState(
                  {
                    tagSelected: "",
                    feedSelected: "global",
                    activePage: 1,
                  },
                  this.getArticles
                )
              }
            >
              <i className="fas fa-newspaper mr-2"></i>
              Global Feed
            </span>
            <div
              className={
                tagSelected ? "visible text-xs sm:text-lg lg:text-xl" : "hidden"
              }
            >
              <span className="mx-4 text-gray-500">/</span>
              <span className="text-green-700 pb-2 border-b-2 border-green-700">
                #{this.state.tagSelected}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between py-8">
            {/* articles part */}
            <div className="flex-100 lg:flex-70">
              <Articles
                articles={articles}
                error={error}
                handleFavorite={this.handleFavorite}
              />
            </div>

            {/* tags part */}
            <div className="flex-100 lg:flex-25">
              <Tags selectTag={this.selectTag} {...this.state} />
            </div>
          </div>

          {/* page indicator */}
          <div className="flex justify-center flex-wrap pt-4 py-6">
            <Pagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePage={activePage}
              handleClick={this.handleClick}
            />
          </div>
        </section>
      </main>
    );
  }
}

export default Main;
