import React from 'react';
import { shallow } from 'enzyme';
import ReposList from './ReposList';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const repos = [];
const showUsers = () => {console.log('Muestra usuarios');};
const reposList = shallow(<ReposList data={repos} onBack={showUsers} />);

describe('Objetivo: verificar comportamiento del componente', () => {
  test('ReposList se renderiza', () => {
      expect(reposList).toBeTruthy();
  });
});
