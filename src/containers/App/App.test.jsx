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
const initialState = app.state('users');
let searchTerm = 'Qoco';
const users = [
  {
    login: 'Qocotzxin'
  }
];

new MockAdapter(axios)
  .onGet(
    `https://api.github.com/search/users?q=${searchTerm}+in:login+in:fullname+in:email`
  )
  .reply(200, {
    items: startsWith(users[0].login, searchTerm) ? users : []
  });

describe('Objetivo: verificar comportamiento del componente ', () => {
  test('El componente App es creado', () => {
    expect(app).toBeTruthy();
  });

  test('El componente App renderiza el component SearchBar', () => {
    expect(app.find('SearchBar')).toBeTruthy();
  });

  test('Si la búsqueda tiene resultados, se renderiza el component UsersList', () => {
    app
      .instance()
      .githubUserSearch(searchTerm)
      .then(app => {
        expect(app.find('UsersList')).toBeTruthy();
      })
      .catch();
  });
});

describe('Objetivo: verificar los cambios de estado', () => {
  test('El estado users comienza vacío', () => {
    expect(initialState.length).toBeFalsy();
  });

  test('Si el estado de SearchBar cambia, se hace un request y el estado de App cambia (contiene los usuarios)', () => {
    app
      .instance()
      .githubUserSearch(searchTerm)
      .then(app => {
        expect(app.state('users').length).toBeTruthy();
      })
      .catch();
  });

  test('Si no hay resultados en la búsqueda, el estado users vuelve a estar vacío', () => {
    app
      .instance()
      .githubUserSearch('Otro')
      .then(app => {
        expect(app.state('users').length).toBeFalsy();
      })
      .catch();
  });
});

describe('Objetivo: verificar los cambios de estado', () => {
  test('componentDidMount es llamado', () => {
    const componentDidMount = jest.fn();

    class TestDidMount extends App {
      constructor(props) {
        super(props);
        this.componentDidMount = componentDidMount;
      }

      render() {
        return <App />;
      }
    }

    shallow(<TestDidMount />);
    expect(componentDidMount.mock.calls.length).toBe(1);
  });

  test('componentWillUnmount es llamado', () => {
    const componentWillUnmount = jest.fn();

    class TestWillUnmount extends App {
      constructor(props) {
        super(props);
        this.componentWillUnmount = componentWillUnmount;
      }

      render() {
        return <App />;
      }
    }

    const wrapper = shallow(<TestWillUnmount />);

    wrapper.unmount();
    expect(componentWillUnmount.mock.calls.length).toBe(1);
  });
});
