import moment from 'moment';
import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';

class ReposList extends Component {
  /**
   * @constructor
   * @param {*} props
   * Inicializa el estado { users, data, redirection } del componente.
   * {users} es el listado de usuarios para que pueda mostrar nuevamente
   * App cuando se vuelve desde ReposList, {data} es el listado de
   * repositorios del usuario seleccionado y {redirect} determina
   * la redirección a App
   */
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.location ? this.props.location.state.users : [],
      data: this.props.location ? this.props.location.state.data : [],
      redirection: false
    };
  }

  /**
   * @function
   * @returns {void}
   * Modifica el estado {redirection}
   */
  onBack = () => {
    this.setState({ redirection: true });
  };

  /**
   * @function
   * @returns {JSX}
   * Mapea el array de repositorios para retornar
   * el listado de los mismos.
   */
  render = () => {
    const userRepos = this.state.data.map((repo, index) => {
      return (
        <Fragment key={repo.id}>
          <div className="card repos__item" title={repo.name}>
            <div className="card-header repos__title" title={repo.name}>
              {repo.name}
            </div>
            <div className="card-body">
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
        </Fragment>
      );
    });

    if (this.state.redirection) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { users: this.state.users }
          }}
        />
      );
    }

    return (
      <div className="repos">
        <div className="repos__header">
          <h3>Cantidad de repositorios: {this.state.data.length}</h3>
          <button className="btn btn-warning" onClick={() => this.onBack()}>
            Volver
          </button>
        </div>
        <div className="repos__list">{userRepos}</div>
      </div>
    );
  };
}
export default ReposList;
