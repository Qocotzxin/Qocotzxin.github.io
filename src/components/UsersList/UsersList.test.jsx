import React from 'react';
import { shallow } from 'enzyme';
import UsersList from './UsersList';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const users = [];
const usersList = shallow(<UsersList users={users} />);

describe('Objetivo: verificar comportamiento del componente', () => {
  test('UsersList se renderiza', () => {
    expect(usersList).toBeTruthy(); 
  });
});
