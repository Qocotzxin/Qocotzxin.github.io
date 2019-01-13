import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { startsWith } from 'lodash';
import SearchBar from '../../components/SearchBar/SearchBar';
import UsersList from '../../components/UsersList/UsersList';
import RiseLoader from 'react-spinners';
import SweetAlert from 'sweetalert-react';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const options = {
  disableLifecycleMethods: false
};
let app = shallow(<App />, options);
const initialState = app.state('users');
let searchTerm = 'Qoco';
const users = [
  {
    login: 'Qocotzxin'
  }
];

new MockAdapter(axios, { delayResponse: 2000 })
  .onGet(
    `https://api.github.com/search/users?q=${searchTerm}+in:login+in:fullname+in:email`
  )
  .reply(200, {
    items: startsWith(users[0].login, searchTerm) ? users : []
  });

/**
 * Antes de correr cada test monta el componente
 */
beforeEach(() => {
  app = shallow(<App />, options);
});

/**
 * Después de correr cada test desmonta el componente
 */
afterEach(() => {
  app.unmount();
});

describe('Objetivo: verificar las piezas del componente ', () => {
  test('El componente App es creado', () => {
    expect(app).toBeTruthy();
  });

  test('El componente App renderiza el component SearchBar', () => {
    expect(app.find(SearchBar)).toBeTruthy();
  });

  test('El componente App renderiza el component SweetAlert', () => {
    expect(app.find(SweetAlert)).toBeTruthy();
  });

  test('El componente App renderiza el component RiseLoader', () => {
    expect(app.find(RiseLoader)).toBeTruthy();
  });

  test('El componente App renderiza el component UsersList', () => {
    expect(app.find(UsersList)).toBeTruthy();
  });
});

describe('Objetivo: verificar los comportamientos basados en cambios de estado', () => {
  test('Si el estado loading es false el spinner no se debe renderizar', () => {
    app.setState({ loading: false });
    app.update();
    expect(app.html()).not.toContain(
      '<h2 class="search__title">Buscador de usuarios de Github</h2>'
    );
  });
});

describe('Objetivo: verificar las funciones', () => {
  test('Si hay un cambio en SearchBar, se ejecuta la búsqueda de usuarios', () => {
    app.instance().search = jest.fn();
    app.update();
    app.instance().setSearch(searchTerm);
    expect(app.instance().search).toBeCalledWith(searchTerm);
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

describe('Objetivo: verificar la propiedad isMounted en los ciclos de vida', () => {
  test('La propiedad isMounted pasa a tener valor true durante el ciclo didMount', () => {
    expect(app.instance().isMounted).toBeTruthy();
  });

  test('componentWillUnmount es llamado, por ende la propiedad isMounted cambia a false', () => {
    /**
     * Dado que no se puede testear una propiedad
     * que no existe (es decir una vez que el componente
     * se desmonta) se verifica que el ciclo de vida
     * sea llamado.
     */
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
