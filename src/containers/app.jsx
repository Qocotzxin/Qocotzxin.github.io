import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SearchBar from '../components/SearchBar/SearchBar';
import axios from 'axios';
import { debounce } from 'lodash';
import UsersList from '../components/UsersList/UsersList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], selectedUser: '' };
    this.githubUserSearch = this.githubUserSearch.bind(this);
  }

  githubUserSearch(term) {
    return axios
      .get(
        `https://api.github.com/search/users?q=${term}+in:login+in:fullname+in:email`
      )
      .then(response => this.setState({ users: response.data.items }))
      .catch(() => this.setState({ users: [] }));
  }

  render() {
    return (
      <div className="app">
        <SearchBar onSearchTermChange={debounce(this.githubUserSearch, 500)} />
        <UsersList users={this.state.users}></UsersList>
      </div>
    );
  }
}

export default hot(module)(App);
