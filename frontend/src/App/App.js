import React from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './App.scss';

import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../login/Login'
import GeneralOnboarding from '../SignUp/GeneralOnboarding'

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/onboarding-general" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-education-1" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-education-2" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-education-3" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-experience-1" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-experience-2" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-skills" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-projects-1" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-projects-2" component={GeneralOnboarding}/>
        </Switch>
    </Router>
  );
}

export default App;
