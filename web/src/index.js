import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import GlobalStyle from  "./styles/global";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute  from './components/Route/PrivateRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Debt from './pages/Debt';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute  path="/" exact={true} component={Home} />
      <PrivateRoute  path="/debt" component={Debt} />
    </Switch>
    <GlobalStyle/>
  </ BrowserRouter>,
  document.getElementById('root')
);