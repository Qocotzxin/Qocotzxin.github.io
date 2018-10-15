import React, { Component } from "react";
import { hot } from "react-hot-loader";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }
  render() {
    return (
      <div className="search__container">
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

  onInputChange(term) {
    this.setState({ term: term });
    this.props.onSearchTermChange(term);
  }
}

export default hot(module)(SearchBar);
