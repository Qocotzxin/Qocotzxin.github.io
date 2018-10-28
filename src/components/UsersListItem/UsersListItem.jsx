import React from 'react';
import { hot } from 'react-hot-loader';

const UsersListItem = ({ user, onUserSelect }) => {
  const imageUrl = user.snippet.thumbnails.default.url;

  return (
    <li onClick={() => onUserSelect(user)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading" />
          {user.snippet.title}
        </div>
      </div>
    </li>
  );
};

export default hot(module)(UsersListItem);
