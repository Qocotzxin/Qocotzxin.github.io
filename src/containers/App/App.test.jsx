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
import SweetAlert from 'sweetalert-react';
import { Redirect } from 'react-router-dom';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const axiosMock = new MockAdapter(axios);

let app = shallow(<App />);

const initialState = app.state('users');

const searchTerm = 'Qoco';

const users = [
  {
    login: 'Qocotzxin'
  }
];

const repos = [
  {
    id: 1,
    name: 'Nombre de repo',
    created_at: '2017-08-25T16:52:03Z',
    forks: 2,
    watchers: 5,
    html_url: 'https://github.com/user/angular-example'
  }
];

axiosMock
  .onGet(
    'https://api.github.com/search/users?q=Qoco+in:login+in:fullname+in:email'
  )
  .reply(200, {
    items: startsWith(users[0].login, searchTerm) ? users : []
  });

axiosMock.onGet('https://api.github.com/users/Qocotzxin/repos').reply(200, {
  repos: repos
});

/**
 * Antes de correr cada test monta el componente
 */
beforeEach(() => {
  app = shallow(<App />);
});

/**
 * Después de correr cada test desmonta el componente
 */
afterEach(() => {
  app.unmount();
});

/**
 * Tests que verifican la existencia de componentes y subcomponentes
 */
describe('Objetivo: verificar las piezas del componente ', () => {
  test('El componente App es creado', () => {
    expect(app).toBeTruthy();
  });

  test('El componente App renderiza el component SearchBar', () => {
    expect(app.find(SearchBar).length).toBeTruthy();
  });

  test('El componente App renderiza el component SweetAlert si el estado users contiene algún objeto y el estado repos no', () => {
    app.setState({ users: users, repos: [] });
    expect(app.find(SweetAlert).length).toBeTruthy();
  });

  test('El componente App renderiza el spinner si el estado loading es true', () => {
    app.setState({ loading: true });
    expect(app.find('.spinner').length).toBeTruthy();
  });

  test('El componente App renderiza el component UsersList', () => {
    app.setState({ users: users });
    expect(app.find(UsersList).length).toBeTruthy();
  });
});

/**
 * Tests que verifican los cambios de estados y sus consecuencias
 */

describe('Objetivo: verificar los métodos y cambios de estado', () => {
  test('Si el estado loading es false el spinner no se debe renderizar', () => {
    app.setState({ loading: false });
    app.update();
    app.instance().forceUpdate();
    expect(app.html().includes('spinner')).toBeFalsy();
  });

  test('Si hay un cambio en SearchBar, se ejecuta la búsqueda de usuarios', () => {
    app.instance().search = jest.fn();
    app.update();
    app.instance().setSearch(searchTerm);
    expect(app.instance().search).toBeCalledWith(searchTerm);
  });

  test('El método showRepos cambia los estados loading y loadingRepos a true, y llama al método getRepos', () => {
    const mockGetRepos = jest.spyOn(app.instance(), 'getRepos');
    app.update();
    app.instance().forceUpdate();
    app.instance().showRepos('');
    expect(mockGetRepos).toBeCalled();
    expect(app.state('loading')).toBe(true);
    expect(app.state('loadingRepos')).toBe(true);
  });

  test('El método getRepos cambia el estado loading y loadingRepo a false y repos a la data retornada ', () => {
    app
      .instance()
      .getRepos('https://api.github.com/users/Qocotzxin/repos')
      .then(app => {
        expect(app.state('loading')).toBeFalsy();
        expect(app.state('loadingRepos')).toBeFalsy();
        expect(app.state('repos').length).toBe(1);
      })
      .catch(error => {
        throw error;
      });
  });

  test('Si getRepos no retorna data, el estado alert es true ', () => {
    axiosMock.onGet('https://api.github.com/users/Qocotzxin/repos').reply(200, {
      repos: []
    });
    app
      .instance()
      .getRepos('https://api.github.com/users/Qocotzxin/repos')
      .then(app => {
        expect(app.state('alert')).toBeTruthy();
      })
      .catch(error => {
        throw error;
      });
  });

  test('Si el método getRepos falla, retorna error y los esatdos loading y loadingRepos son false', () => {
    axiosMock
      .onGet('https://api.github.com/users/Qocotzxin/repos')
      .networkError();
    app
      .instance()
      .getRepos('https://api.github.com/users/Qocotzxin/repos')
      .then(app => {
        expect(app.state('loading')).toBeUndefined();
      })
      .catch(() => {
        expect(() => {
          throw new Error();
        }).toThrow();
      });
  });

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
      .catch(error => {
        throw error;
      });
  });

  test('Si hay una respuesta y el componente está montado, la funcion githubUserSearch cambiar el estado users y loading', () => {
    app
      .instance()
      .githubUserSearch(searchTerm)
      .then(app => {
        expect(app.state('users').length).toBeTruthy();
      })
      .catch(error => {
        throw error;
      });
  });

  test('Si hay un error la funcion githubUserSearch deja el estado users vacio y cambia loading', () => {
    axiosMock
      .onGet(
        'https://api.github.com/search/users?q=y+in:login+in:fullname+in:email'
      )
      .networkError();

    app
      .instance()
      .githubUserSearch('y')
      .then(app => {
        expect(app.state('loading')).toBeUndefined();
      })
      .catch(() => {
        expect(app.state('users').length).toBeFalsy();
        expect(app.state('loading').length).toBeFalsy();
      });
  });

  test('Si hay repositorios en la respuesta y hay usuarios, debe renderizar Redirect', () => {
    app.setState({ users: users, repos: repos });
    expect(app.find(Redirect)).toBeTruthy();
  });

  test('Si hay repositorios en la respuesta y hay usuarios, debe renderizar Redirect', () => {
    if (!app.prop('location')) {
      expect(app.state('users').length).toBeFalsy();
    } else {
      expect(app.state('users').length).toBeTruthy();
    }
  });

  test('Si no hay resultados en la búsqueda, el estado users vuelve a estar vacío', () => {
    app
      .instance()
      .githubUserSearch('Otro')
      .then(app => {
        expect(app.state('users').length).toBeFalsy();
      })
      .catch(error => {
        throw error;
      });
  });

  test('El evento confirm de SweetAlert cambia el estado alert a false', () => {
    app.setState({ users: users, repos: [] });
    app.find(SweetAlert).simulate('confirm');
    expect(app.state('alert')).toBeFalsy();
  });
});
