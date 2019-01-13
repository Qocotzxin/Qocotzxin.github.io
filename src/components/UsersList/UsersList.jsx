import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

/**
 * @function
 * @param {*} props
 * @returns {JSX}
 * Cuando recibe los usuarios retorna
 * un listado con información de cada uno.
 */
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: this.props.users };
  }

  getUserItem = user => {
    return (
      <li
        user={user}
        onClick={() => this.props.onUserSelection(user.repos_url)}
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
    );
  };

  /**
   * @constant
   * Mapea los resultados de lo búsqueda de usuarios
   * en un listado con información detallada.
   */
  render() {
    const usersItems = this.state.users.map(user => {
      return (
        <LazyLoad height={95} key={user.id} once>
          {this.getUserItem(user)}
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
}

export default UsersList;
