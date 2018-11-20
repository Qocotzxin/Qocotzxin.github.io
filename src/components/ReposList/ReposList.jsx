import moment from 'moment';
import React from 'react';
import LazyLoad from 'react-lazyload';

const ReposList = props => {
  const { data } = props;

  const userRepos = data.map(repo => {
    return (
      <LazyLoad height={95} key={repo.id} once>
        <div
          onClick={() => window.open(repo.html_url, '_blank')}
          title={repo.name}
          className="repos__item"
        >
          <div>
            <p>{repo.name}</p>
          </div>
          <div>
            <p>{moment(repo.created_at).format('DD/MM/YYYY')}</p>
          </div>
          <div>
            <p>{repo.forks}</p>
          </div>
          <div>
            <p>{repo.owner.login}</p>
          </div>
          <div>
            <p>{repo.watchers}</p>
          </div>
        </div>
      </LazyLoad>
    );
  });

  return (
    <div className="repos">
      <h3>Cantidad de repositorios: {data.length}</h3>
      <div className="repos__header">
        <p>Nombre completo</p>
        <p>Fecha de creación</p>
        <p>Forks</p>
        <p>Dueño del repositorio</p>
        <p>Watchers</p>
      </div>
      <ul>{userRepos}</ul>
    </div>
  );
};

export default ReposList;
