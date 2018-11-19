import React from 'react';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

/**
 * @function
 * @param {*} props
 * @returns {JSX}
 * Cuando recibe los usuarios retorna
 * un listado con información de cada uno.
 */
const UsersList = props => {
  /**
   * Usuarios provistos por App
   */
  const { users } = props;

  /**
   * @function
   * @param {string} repos_url
   * Realiza la búsqueda de repositorios del usuario
   * y los comunica al padre (App)
   */
  const showUserPage = ({ repos_url }) => {
    return axios
      .get(`${repos_url}`)
      .then(response => {
        props.onUserSelection(response.data);
      })
      .catch(error => { throw error; });
  };

  /**
   * @constant
   * Mapea los resultados de lo búsqueda de usuarios
   * en un listado con información detallada.
   */
  const usersItems = users.map(user => {
    return (
      <LazyLoad height={95} key={user.id} once>
        <li
          user={user}
          onClick={() => showUserPage(user)}
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
};

export default UsersList;
