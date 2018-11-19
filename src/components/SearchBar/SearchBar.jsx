import React, { Component } from 'react';

/**
 * @class
 * Input que dispara la búsqueda de usuarios de Github
 */
class SearchBar extends Component {
  /**
   * @constructor
   * @param {*} props
   * Inicializa el estado 'term' del componente.
   */
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  /**
   * @function
   * @returns {void}
   * Retorna el html del componente
   */
  render = () => {
    return (
      <div className="search">
        <h2 className="search__title">Buscador de usuarios de Github</h2>
        <input
          name="Buscador"
          id="search-bar"
          className="form-control"
          type="text"
          placeholder="Usuario..."
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  /**
   * @function
   * @param {string} term
   * @returns {void}
   * Cambia el estado del componente y le avisa al padre (App)
   */
  onInputChange = (term) => {
    this.setState({ term: term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
