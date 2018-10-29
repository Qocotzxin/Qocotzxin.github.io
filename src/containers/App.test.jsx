import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App.jsx';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { startsWith } from 'lodash';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const app = shallow(<App />);
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
