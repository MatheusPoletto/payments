import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './components/Route/ProtectedRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Debt from './pages/Debt';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" exact={true} component={Home} />
      <ProtectedRoute path="/debt" component={Debt} />
    </Switch>
  </ BrowserRouter>,
  document.getElementById('root')
);