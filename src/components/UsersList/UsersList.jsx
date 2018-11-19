import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import ReposList from '../ReposList/ReposList';
import axios from 'axios';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: false, repoData: [] };
  }

  render = () => {
    const { users } = this.props;

    const usersItems = users.map(user => {
      return (
        <LazyLoad height={95} key={user.id} once>
          <li
            user={user}
            onClick={() => this.showUserPage(user)}
            title={user.login}
            className="userslist__item"
          >
            <div>
              <img src={user.avatar_url} />
            </div>
            <div>
              <p>{user.login}</p>
            </div>
            <div>
              <p>{user.score}</p>
            </div>
          </li>
        </LazyLoad>
      );
    });

    if (!this.state.repos) {
      return (
        <div className="userslist">
          <div className="userslist__header">
            <h5>Avatar</h5>
            <h5>Usuario</h5>
            <h5>Puntaje</h5>
          </div>
          <ul className="list-group">{usersItems}</ul>
        </div>
      );
    }

    return <ReposList data={this.state.repoData} />;
  };

  showUserPage = ({ repos_url }) => {
    return axios
      .get(`${repos_url}`)
      .then(response => {
        this.setState({ repos: true, repoData: response.data });
      })
      .catch(() => this.setState({ repos: false }));
  };
}

export default UsersList;
