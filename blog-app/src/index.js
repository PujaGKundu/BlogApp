import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";
import "./style.css";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/">
        <App />
      </Route>
    </div>
  </BrowserRouter>,

  document.getElementById("root")
);
