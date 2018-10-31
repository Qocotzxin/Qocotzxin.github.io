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
          <li user={user}>
            <div>
              <img src={user.avatar_url} />
            </div>
            <div>
              <strong>{user.login}</strong>
            </div>
            <div>
              <strong>{user.score}</strong>
            </div>
          </li>
        </LazyLoad>
      );
    });

    return (
      <div className="list">
        <div className="header">
          <h3>Avatar</h3>
          <h3>Usuario</h3>
          <h3>Puntaje</h3>
        </div>
        <ul className="list-group">{usersItems}</ul>
      </div>
    );
  }
}

export default hot(module)(UsersList);
