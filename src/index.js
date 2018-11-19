import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './containers/App/App';
import 'normalize.css';
import '../style/main.scss';

ReactDOM.render(
  <Fragment>
    <BrowserRouter>
      <App>
        <div>
          <Switch>
            <Route path="/coverage" />
          </Switch>
          <Switch>
            <Route path="/docs" />
          </Switch>
        </div>
      </App>
    </BrowserRouter>
  </Fragment>,
  document.getElementById('container')
);
