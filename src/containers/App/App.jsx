import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import UsersList from '../../components/UsersList/UsersList';
import axios from 'axios';
import { debounce } from 'lodash';
import { RiseLoader } from 'react-spinners';
import SweetAlert from 'sweetalert-react';
import { Redirect } from 'react-router-dom';
/**
 * @class
 * Contenedor general de la aplicación
 */
class App extends Component {
  /**
   * @constructor
   * @param {*} props
   * Inicializa el estado { users, loading } del componente.
   * { users } contiene los usuarios devueltos de la búsqueda,
   * { loading } determina la aparición del spinner
   * durante la búsqueda de usuario y { loadingRepos } muestra
   * el spinner durante la búsqueda de los repositorios
   */
  constructor(props) {
    super(props);
    this.state = {
      users:
        // Se compara location y location.state porque sino los tests no corren
        this.props.location && this.props.location.state
          ? this.props.location.state.users
          : [],
      loading: false,
      loadingRepos: false,
      repos: [],
      alert: false
    };
    this.githubUserSearch = this.githubUserSearch.bind(this);
  }

  /**
   * @function
   * @param {string} term
   * @returns {void}
   * Cambia el estado a { loading: true } e invoca
   * el método de búsqueda con parámetro
   */
  setSearch = term => {
    this.setState({ loading: true });
    this.search(term);
  };

  /**
   * @property {void}
   * Después de 0,5 segundos ejecuta la función githubSearch.
   */
  search = debounce(this.githubUserSearch, 500);

  /**
   * @method
   * @param {string} term
   * @returns {void}
   * Ejecuta la búsqueda de usuarios de github
   * y modifica el estado {users, loading}
   */
  githubUserSearch(term) {
    return axios
      .get(
        `https://api.github.com/search/users?q=${term}+in:login+in:fullname+in:email`
      )
      .then(response => {
        this.setState({ users: response.data.items, loading: false });
      })
      .catch(() => {
        this.setState({ users: [], loading: false });
      });
  }

  /**
   * @function
   * @param {string} repos_url
   * @returns {void}
   * Cambia el estado a { loading: true, loadingRepos: true } e invoca
   * el método de búsqueda de repositorios con parámetro
   */
  showRepos = repos_url => {
    this.setState({ loading: true, loadingRepos: true });

    this.getRepos(repos_url);
  };

  /**
   * @function
   * @param {string} repos_url
   * @returns {void}
   * Realiza la búsqueda de repositorios del usuario
   * y los comunica al hijo (ReposList) mediante la redirección
   */
  getRepos = repos_url => {
    return axios
      .get(`${repos_url}`)
      .then(response => {
        this.setState({
          loading: false,
          loadingRepos: false,
          repos: response.data
        });

        if (!response.data.length) {
          this.setState({ alert: true });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          loadingRepos: false
        });
        throw error;
      });
  };

  /**
   * @function
   * @returns {JSX}
   * Retorna el contenido de la aplicación que incluye
   * SearchBar (barra de búsqueda), RiseLoader (spinner),
   * UsersList (lista de usuarios si hay resultados) y
   * SweetAlert (alerta que informa si no hay repositorios)
   * y un Redirect al listado de repositorios (en caso de haber)
   */
  render = () => {
    if (this.state.loading) {
      return (
        <div className="app">
          {!this.state.loadingRepos ? (
            <SearchBar onSearchTermChange={this.setSearch} />
          ) : null}
          <RiseLoader
            className={'spinner'}
            sizeUnit={'px'}
            size={20}
            color={'rgba(43, 182, 158, 0.9)'}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      if (this.state.users.length) {
        if (!this.state.repos.length) {
          return (
            <div className="app">
              <SearchBar onSearchTermChange={this.setSearch} />
              <UsersList
                users={this.state.users}
                onUserSelection={this.showRepos}
              />
              <SweetAlert
                show={this.state.alert}
                title="Ups..."
                text="Este usuario no tiene repositorios"
                onConfirm={() => this.setState({ alert: false })}
              />
            </div>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/repos',
                state: { data: this.state.repos, users: this.state.users }
              }}
              push
            />
          );
        }
      }

      return (
        <div className="app">
          <SearchBar onSearchTermChange={this.setSearch} />
          <h3>No hay resultados para mostrar</h3>
        </div>
      );
    }
  };
}

export default App;
