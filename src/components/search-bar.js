import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "../../style/main.scss";

class SearchBar extends Component {
  render() {
    return (
      <div className="search__container">
        <h2 className="search__title">Buscador de usuarios de Github</h2>
        <input
          name="Buscador"
          id="search-bar"
          className="form-control"
          type="text"
          placeholder="Usuario..."
        />
      </div>
    );
  }
}

export default hot(module)(SearchBar);
