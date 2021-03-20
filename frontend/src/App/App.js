import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './App.scss';
import Home from '../Home/Home';
import Search from '../Search/Search';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import OnboardingPage from '../Onboarding/OnboardingPage';
import Verify from '../SignUp/Verify';
import WrongLogin from '../Login/WrongLogin';

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/onboarding" component={OnboardingPage}/>
            <Route path="/verify-email" component={Verify}/>
            <Route path="/login-retry" component={WrongLogin}/>
        </Switch>
    </Router>
  );
}

export default App;
