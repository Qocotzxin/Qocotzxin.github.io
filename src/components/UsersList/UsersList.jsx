import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import LazyLoad from 'react-lazyload';

class UsersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users } = this.props;

    const usersItems = users.map(user => {
      return (
        <LazyLoad height={95} key={user.id} once>
          <li
            user={user}
            onClick={() => this.showUserPage(user)}
            title={user.login}
            className="userslist__item">
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

  showUserPage({ html_url }) {
    window.open(html_url, '_blank');
  }
}

export default hot(module)(UsersList);
