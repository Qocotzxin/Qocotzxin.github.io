import React, { Component } from "react";
import { hot } from "react-hot-loader";
import SearchBar from "../components/search-bar";

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default hot(module)(App);
