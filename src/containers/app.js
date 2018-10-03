import React, { Component } from "react";
import { hot } from "react-hot-loader";
import SearchBar from "../components/search-bar/search-bar";
import axios from "axios";
import debounce from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], selectedUser: "" };
    this.githubUserSearch = this.githubUserSearch.bind(this);
  }

  githubUserSearch(term) {
    debounce(
      axios
        .get(
          `https://api.github.com/search/users?q=${term}+in:login+in:fullname+in:email`,
          { headers: { "User-Agent": "Qocotzxin" } }
        )
        .then(response => this.setState({ users: response.data.items }))
        .catch(error => console.warn(error)),
      400
    );
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={this.githubUserSearch} />
      </div>
    );
  }
}

export default hot(module)(App);
