import React from 'react';
import { hot } from 'react-hot-loader';
// import UsersListItem from './UsersListItem';

const UsersList = props => {
  const usersItems = props.users.map(user => {
    return (
      <li key={user.id} user={user}>
        <div>
          <img className="media-object" src={user.avatar_url} />
        </div>
        <div>
          <strong>{user.login}</strong>
        </div>
        <div>
          <strong>{Math.round(user.score * 100) / 100}</strong>
        </div>
      </li>
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
};

export default hot(module)(UsersList);
