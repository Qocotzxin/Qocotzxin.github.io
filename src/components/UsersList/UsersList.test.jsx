import React from 'react';
import { shallow } from 'enzyme';
import UsersList from './UsersList';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const users = [
  {
    id: 26151631,
    repos_url: 'https://api.github.com/users/Qocotzxin/repos',
    login: 'Qocotzxin',
    avatar_url: 'https://avatars3.githubusercontent.com/u/26151631?v=4',
    score: 31.969936
  }
];
const mockFn = jest.fn();
const usersList = shallow(<UsersList users={users} onUserSelection={mockFn} />);

describe('Objetivo: verificar comportamiento del componente', () => {
  test('UsersList se renderiza', () => {
    expect(usersList).toBeTruthy();
  });

  test('Si hay usuarios, LazyLoad debería existir para renderizar la lista de los mismos', () => {
    expect(usersList.html().includes('lazyload')).toBeTruthy();
  });

  test('Si no hay usuarios, LazyLoad no debería existir', () => {
    const otherUsers = [];
    const usersList = shallow(
      <UsersList users={otherUsers} onUserSelection={mockFn} />
    );
    expect(usersList.html().includes('lazyload')).toBeFalsy();
  });

  test('El método getUserItem debe retornar un elemento del tipo li', () => {
    const li = usersList.instance().getUserItem(users[0]);
    expect(li.type).toBe('li');
  });

  test('Si se hace un click en algún usuario, se debe ejecutar un callback', () => {
    const li = usersList.instance().getUserItem(users[0]);
    li.props.onClick();
    expect(mockFn).toBeCalled();
  });
});
