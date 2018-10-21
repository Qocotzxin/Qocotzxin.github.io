import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const app = shallow(<App />);

describe("Objetivo: verificar comportamiento del componente", () => {
  test("El componente App es creado", () => {
    expect(app).toBeTruthy();
  });

  test("El componente App renderiza el component SearchBar", () => {
      expect(app.find("SearchBar")).toBeTruthy();
  });
});
