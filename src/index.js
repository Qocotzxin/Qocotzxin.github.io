import 'normalize.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/main.scss';
import ReposList from './components/ReposList/ReposList';
import App from './containers/App/App';

ReactDOM.render(
  <Fragment>
    <BrowserRouter>
        <Switch>
          <Route path="/" component={App}/>
          <Route path="/repos/:id" component={ReposList} />
        </Switch>
    </BrowserRouter>
  </Fragment>,
  document.getElementById('container')
);
