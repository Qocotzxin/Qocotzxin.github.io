import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { startsWith } from 'lodash';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const app = shallow(<App />);
const initialUsersState = app.state('users');
const instance = app.instance();
let searchTerm = 'Qoco';
const users = {
  login: 'Qocotzxin'
};

new MockAdapter(axios)
  .onGet(
    `https://api.github.com/search/users?q=${searchTerm}+in:login+in:fullname+in:email`
  )
  .reply(200, {
    users: startsWith(users.login, searchTerm) ? [users] : []
  });

describe('Objetivo: verificar comportamiento del componente', () => {
  test('El componente App es creado', () => {
    expect(app).toBeTruthy();
  });

  test('El componente App renderiza el component SearchBar', () => {
    expect(app.find('SearchBar')).toBeTruthy();
  });
});

describe('Objetivo: verificar cambios de estado del componente', () => {
  test('El estado users comienza vacío, y si hay resultados tras la búsqueda, cambia', () => {
    expect(initialUsersState.length).toBe(0);
    searchTerm = 'Qoco';
    instance.githubUserSearch(searchTerm)
    .then(val => console.log(val))
    .catch(error => console.error(error));
    // app.update();
    // console.log(app.state('users'));
    // expect(app.state('users').length).toBe(1);
    // expect(app.state('users').length).toBe(1);
  });

  // test('Si no hay coincidencias con la búsqueda, el estado users debe estar vacío', () => {
  //   searchTerm = 'Otro';
  //   app.instance().githubUserSearch(searchTerm);
  //   expect(app.state('users').length).toBe(1);
  // });
});
