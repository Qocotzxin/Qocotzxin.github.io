import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./containers/App.jsx";
import "../style/main.scss";

ReactDOM.render(
  <div>
    <App>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/coverage" />
          </Switch>
        </div>
      </BrowserRouter>
    </App>
  </div>,
  document.getElementById("container")
);
