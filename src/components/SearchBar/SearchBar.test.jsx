import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const onSearchTermChange = jest.fn();
const mockedEvent = { target: { value: 'a' } };
const searchBar = shallow(
  <SearchBar onSearchTermChange={onSearchTermChange} />
);
const initialState = searchBar.state('term');
const mockInputChange = jest.spyOn(SearchBar.prototype, 'onInputChange');

describe('Objetivo: verificar comportamiento del componente', () => {
  test('El componente SearchBar es creado', () => {
    expect(searchBar).toBeTruthy();
  });

  test('Cuando se inicializa el componente, el input debe estar vacío', () => {
    expect(searchBar.find('input').text()).toBeFalsy();
  });
});

describe('Objetivo: verificar comportamiento del estado', () => {
  test('Cuando se inicializa el componente, el estado comienza como un string vacío', () => {
    expect(searchBar.state('term')).toBeFalsy();
  });

  test('Si escribo algo en el buscador, el estado del componente cambia', () => {
    searchBar.find('input').simulate('change', mockedEvent);
    expect(searchBar.state('term').length).toBeGreaterThan(initialState.length);
    expect(searchBar.state('term')).toBe('a');
  });

  test('Si escribo algo en el buscador, la funcion onInputChange se ejecuta al menos una vez', () => {
    searchBar.find('input').simulate('change', mockedEvent);
    expect(mockInputChange).toBeCalled();
  });
});
