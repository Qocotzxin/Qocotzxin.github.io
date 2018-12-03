import React from 'react';
import { shallow } from 'enzyme';
import ReposList from './ReposList';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const repos = [];
const users = [];
const reposList = shallow(
  <MemoryRouter initialEntries={['/repos']} initialIndex={1}>
    <ReposList data={repos} users={users} />
  </MemoryRouter>
);

describe('Objetivo: verificar comportamiento del componente', () => {
  test('ReposList se renderiza', () => {
    expect(reposList).toBeTruthy();
  });
});
