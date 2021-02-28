import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './home/Home';
import Login from './login/Login'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
        </Switch>
    </Router>
  );
}

export default App;
