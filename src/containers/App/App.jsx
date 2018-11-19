import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import UsersList from '../../components/UsersList/UsersList';
import ReposList from '../../components/ReposList/ReposList';
import axios from 'axios';
import { debounce } from 'lodash';
import { RiseLoader } from 'react-spinners';

/**
 * @class
 * Contenedor general de la aplicación
 */
class App extends Component {
  /**
   * @constructor
   * @param {*} props
   * Inicializa el estado { users, loading } del componente.
   * { users } contiene los usuarios devueltos de la búsuqeda y
   * { loading } determina la aparición del spinner.
   */
  constructor(props) {
    super(props);
    this.state = { users: [], loading: false };
    this.githubUserSearch = this.githubUserSearch.bind(this);
  }

  /**
   * @function
   * @returns {void}
   * Cambia el estado a { loading: true } e invoca 
   * el método de búsqueda con parámetro
   */
  setSearch = term => {
    this.setState({ loading: true });
    this.search(term);
  };

  /**
   * Después de 0,5 segundos ejecuta la función githubSearch
   */
  search = debounce(this.githubUserSearch, 500);

  /**
   * @function
   * @returns {void}
   * Ejecuta la búsqueda de usuarios de github
   * y modifica el estado {users, loading}
   */
  githubUserSearch(term) {
    return axios
      .get(
        `https://api.github.com/search/users?q=${term}+in:login+in:fullname+in:email`
      )
      .then(response =>
        this.setState({ users: response.data.items, loading: false })
      )
      .catch(() => this.setState({ users: [], loading: false }));
  }

  /**
   * @function
   * @returns {void}
   * Retorna el contenido de la aplicación que incluye
   * SearchBar (barra de búsqueda), RiseLoader (spinner),
   * UsersList (lista de usuarios si hay resultados) y
   * ReposList (lista de repositorios del usuario seleccionado)
   */
  render = () => {
    if (this.state.loading) {
      return (
        <div className="app">
          <SearchBar onSearchTermChange={this.setSearch} />
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
        return (
          <div className="app">
            <SearchBar onSearchTermChange={this.setSearch} />
            <UsersList
              users={this.state.users}
              onUserSelection={this.showRepos}
            />
          </div>
        );
      }

      return (
        <div className="app">
          <SearchBar onSearchTermChange={this.setSearch} />
          <h3>No hay resultados para mostrar</h3>
        </div>
      );
    }
  };

  /**
   * @function
   * @param {*} repoData
   * @returns {JSX}
   * Retorna la lista de repositorios del usuario seleccionado.
   */
  showRepos = repoData => {
    return <ReposList data={repoData} />;
  };
}

export default App;
