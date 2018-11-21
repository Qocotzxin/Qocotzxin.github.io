import moment from 'moment';
import React from 'react';
import LazyLoad from 'react-lazyload';

const ReposList = props => {

  /**
   * @constant
   * Información de cada repositorio del usuario.
   */
  const { data } = props;

  /**
   * @function
   * @returns {JSX}
   * Mapea el array de repositorios para retornar
   * el listado de los mismos.
   */
  const userRepos = data.map((repo, index) => {
    return (
      <LazyLoad height={95} key={repo.id} once>
        <div className="card repos__item" title={repo.name}>
          <div className="card-header repos__title" title={repo.name}>
            {repo.name}
          </div>
          <div className="card-body">
            <h5 className="card-title">Dueño: {repo.owner.login}</h5>
            <p className="card-text">
              Creado el: {moment(repo.created_at).format('DD/MM/YYYY')}
            </p>
            <p className="card-text">Forks: {repo.forks}</p>
            <p className="card-text">Watchers: {repo.watchers}</p>
            <a
              className="btn btn-primary"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={index}
            >
              Ver repo
            </a>
          </div>
        </div>
      </LazyLoad>
    );
  });

  return (
    <div className="repos">
      <div className="repos__header">
        <h3>Cantidad de repositorios: {data.length}</h3>
        <button className="btn btn-dark" onClick={() => props.onBack()}>Volver</button>
      </div>
      <div className="repos__list">{userRepos}</div>
    </div>
  );
};

export default ReposList;
