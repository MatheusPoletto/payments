import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PrivateRoute  from './components/Route/PrivateRoute';

import Login from './pages/Login';
import DebtList from './pages/DebtList';
import "./styles.css";

ReactDOM.render(
  <BrowserRouter>
    
        <Switch>          
          <Route path="/login" component={Login} />
          <PrivateRoute  path="/" exact={true} component={DebtList} />
        </Switch>
       
  </ BrowserRouter>,
  document.getElementById('root')
);