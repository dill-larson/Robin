import React from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './App.scss';
import Home from './home/Home';
import Login from './login/Login'

function App() {
  return (
    <div>
    <Router>
      <Row >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </Row>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
