import React, { useState, useEffect, useContext } from "react";
import { validate } from "../utils/validate";
import { userURL } from "../utils/constant";
import { withRouter } from "react-router-dom";
import UserContext from "../context/userContext";
import Loader from "./Loader";

function Settings(props) {
  let context = useContext(UserContext);

  let [image, setImage] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [passwd, setPasswd] = useState("");
  let [bio, setBio] = useState("");
  let [errors, setError] = useState({
    username: "",
    email: "",
    passwd: "",
    bio: "",
  });

  useEffect(() => {
    let { image, username, email, bio } = context.data.user;
    setImage(image);
    setUsername(username);
    setEmail(email);
    setBio(bio);
  }, [context]);

  const handleUsername = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setError({ username: errors });
    setUsername(value);
  };

  const handleEmail = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setError({ email: errors });
    setEmail(value);
  };

  const handlePasswd = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setError({ passwd: errors });
    setPasswd(value);
  };

  const handleBio = ({ target }) => {
    let { name, value } = target;
    validate(errors, name, value);
    setError({ bio: errors });
    setBio(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && image && passwd && email && bio) {
      fetch(userURL, {
        method: "PUT",
        body: JSON.stringify({
          user: {
            username,
            email,
            password: passwd,
            bio,
            image:
              "https://pbs.twimg.com/profile_images/1368973967025836036/yIJ1QI8o_400x400.jpg",
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              for (let key in data.errors) {
                errors[key] = `${key} ${data.errors[key]}`;
              }
              return Promise.reject({ errors });
            });
          }
          return res.json();
        })
        .then((data) => {
          context.handleUser(data.user);
          props.history.push(`/profiles/${data.user.username}`);
        })
        .catch((err) => setError(errors));
    }
  };

  if (!username && !email && !image && !bio) {
    return <Loader />;
  }
  return (
    <main className="">
      <section className="pt-20 px-8">
        <form
          className="w-full md:w-1/2 md:mx-auto p-8 border border-gray-400 rounded-md"
          onSubmit={handleSubmit}
        >
          <legend className="text-center text-2xl sm:text-3xl my-2 font-bold">
            Settings
          </legend>
          <fieldset className="">
            <input
              type="text"
              placeholder="Image Url"
              value={image}
              name="image"
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />

            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsername}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />
            <span className="my-1 text-red-500">{errors.username}</span>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />
            <span className="my-1 text-red-500">{errors.email}</span>

            <input
              type="password"
              name="passwd"
              value={passwd}
              placeholder="Password"
              onChange={handlePasswd}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />
            <span className="my-1 text-red-500">{errors.passwd}</span>

            <textarea
              value={bio}
              rows="6"
              name="bio"
              placeholder="Enter your Bio"
              onChange={handleBio}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            ></textarea>
            <span className="my-1 text-red-500">{errors.bio}</span>

            <input
              type="submit"
              value="Update"
              className="my-2 p-2 rounded-md outline-none bg-blue-500 hover:bg-blue-400 text-white w-full"
            ></input>
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default withRouter(Settings);
