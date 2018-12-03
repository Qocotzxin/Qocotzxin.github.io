import 'normalize.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import '../style/main.scss';
import ReposList from './components/ReposList/ReposList';
import App from './containers/App/App';

ReactDOM.render(
  <Fragment>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/repos" component={ReposList} />
      </Switch>
    </HashRouter>
  </Fragment>,
  document.getElementById('container')
);
