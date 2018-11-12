import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import axios from 'axios';
import { debounce } from 'lodash';
import UsersList from '../../components/UsersList/UsersList';
import { RiseLoader } from 'react-spinners';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], selectedUser: '', loading: false };
  }

  setSearch = () => {
    this.setState({ loading: true });
    debounce(this.githubUserSearch, 500);
  };

  githubUserSearch = (term) => {
    this.setState({ loading: true });
    return axios
      .get(
        `https://api.github.com/search/users?q=${term}+in:login+in:fullname+in:email`
      )
      .then(response =>
        this.setState({ users: response.data.items, loading: false })
      )
      .catch(() => this.setState({ users: [], loading: false }));
  }

  render = () => {
    if (this.state.loading) {
      return (
        <div className="app">
          <SearchBar
            onSearchTermChange={debounce(this.githubUserSearch, 500)}
          />
          <RiseLoader
            className={'spinner'}
            sizeUnit={'px'}
            size={20}
            color={'rgba(43, 182, 158, 0.9)'}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      if (this.state.users.length) {
        return (
          <div className="app">
            <SearchBar onSearchTermChange={this.setSearch} />
            <UsersList users={this.state.users} />
          </div>
        );
      }

      return (
        <div className="app">
          <SearchBar onSearchTermChange={this.setSearch} />
          <h3>No hay resultados para mostrar</h3>
        </div>
      );
    }
  }
}

export default App;
