import React, { useState, useEffect, useContext } from "react";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
import { withRouter } from "react-router-dom";
import CommentBox from "./CommentBox";
import UserContext from "../context/userContext";

function Article(props) {
  let context = useContext(UserContext);

  let [article, setArticle] = useState("");
  let [error, setError] = useState("");

  useEffect(() => {
    getArticle();
  });

  //function to fetch the article details
  const getArticle = () => {
    fetch(articlesURL + `/${props.match.params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
      })
      .catch((err) => {
        setError("Not able to fetch Articles");
      });
  };

  //function to display date in nicer format
  const getDate = (date) => {
    let newDate = new Date(date).toISOString().split("T")[0];
    return newDate;
  };

  //function to handle article edit
  const handleEdit = () => {
    let { slug } = article;
    props.history.push({
      pathname: `/articles/edit/${slug}`,
      article: article,
    });
  };

  //function to delete article
  const handleDelete = () => {
    let { user } = context.data;
    fetch(articlesURL + "/" + props.match.params.slug, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        props.history.push(`/profiles/${user.username}`);
      })
      .catch((err) => console.log(err));
  };

  let { isLoggedIn, user } = context.data;
  if (error) {
    return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
  }

  if (!article) {
    return <Loader />;
  }
  let { tagList } = article;

  return (
    <main className="pb-12">
      <section className="px-20 bg-articlePage text-white py-12">
        <h2 className="mt-2 mb-3 text-4xl">{article.title}</h2>
        <p className="">{article.description}</p>
        <div className="flex flex-col items-start py-6 sm:flex-row sm:items-center">
          <img
            src={article.author.image}
            alt={article.author.username}
            className="w-16 h-16 object-cover rounded-full"
          />
          <span className="mx-3 my-2">{article.author.username}</span>
          <span className="mx-3 my-1">{getDate(article.createdAt)}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            {tagList.map((tag) => {
              return (
                tag && (
                  <span
                    key={tag}
                    className="mr-3 bg-red-400 p-1 px-2 text-xs rounded-md w-max my-2"
                  >
                    {tag}
                  </span>
                )
              );
            })}
          </div>

          <div className="my-3">
            <span
              className={
                isLoggedIn && user.username === article.author.username
                  ? "bg-blue-500 py-2 px-4 text-white rounded-md mr-4 cursor-pointer"
                  : "hidden"
              }
              onClick={handleEdit}
            >
              Edit
            </span>

            <span
              className={
                isLoggedIn && user.username === article.author.username
                  ? "bg-red-500 py-2 px-4 text-white rounded-md mr-4 cursor-pointer"
                  : "hidden"
              }
              onClick={handleDelete}
            >
              Delete
            </span>
          </div>
        </div>
      </section>

      {/* article body */}
      <section className="px-20 py-12">
        <p className="text-xl">{article.body}</p>
      </section>

      {/* Comments*/}
      <section className="px-20">
        <h2 className="text-3xl font-bold">Comments</h2>
        <CommentBox slug={article.slug} />
      </section>
    </main>
  );
}

export default withRouter(Article);
