import React from 'react';
import { shallow } from 'enzyme';
import ReposList from './ReposList';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new EnzymeAdapter() });

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
const users = [
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/26151631?v=4',
    html_url: 'https://github.com/Qocotzxin',
    id: 26151631,
    login: 'Qocotzxin',
    repos_url: 'https://api.github.com/users/Qocotzxin/repos',
    score: 31.872934,
    url: 'https://api.github.com/users/Qocotzxin'
  }
];

const reposListWrapper = shallow(
  <MemoryRouter initialEntries={['/repos']} initialIndex={1}>
    <ReposList data={repos} users={users} />
  </MemoryRouter>
);

const reposList = reposListWrapper.find(ReposList).dive();
reposList.setState({ data: repos, users: users });

describe('Objetivo: verificar comportamiento del componente', () => {
  test('ReposList se renderiza', () => {
    expect(reposListWrapper.find(ReposList)).toBeTruthy();
  });

  test('ReposList se renderiza en la dirección "/repos"', () => {
    expect(reposListWrapper.props().history.location.pathname).toBe('/repos');
  });
});

describe('Objetivo: verificar comportamiento de los estados', () => {
  test('El estado del componente debe comenzar con redirection en false y data y users deben tener un elemento cada uno.', () => {
    expect(reposList.state('redirection')).toBe(false);
    expect(reposList.state('data').length).toBe(1);
    expect(reposList.state('users').length).toBe(1);
  });

  test('El método onBack modifica el estado redirection a true', () => {
    reposList.instance().onBack();
    expect(reposList.state('redirection')).toBe(true);
    reposList.setState({ redirection: false });
  });
});

describe('Objetivo: verificar los elementos renderizados del componente y sus comportamientos', () => {
  test('El botón volver ejecuta el callback onBack', () => {
    const mockCallback = jest.spyOn(reposList.instance(), 'onBack');
    reposList.update();
    reposList.instance().forceUpdate();
    reposList.find('.btn-warning').simulate('click');
    expect(mockCallback).toBeCalled();
    reposList.setState({ redirection: false });
  });

  test('Debe existir un div con la clase "repos__item" por cada repositorio existente', () => {
    expect(reposList.html().includes('repos__item')).toBeTruthy();
  });
});
