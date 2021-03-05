import React from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './App.scss';

import NavBar from '../NavBar/NavBar';

import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login'

function App() {
  return (
    <Router>
        <NavBar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
    </Router>
  );
}

export default App;
