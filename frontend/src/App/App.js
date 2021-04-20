import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

/* components */
import Home from '../Home/Home';
import Search from '../Search/Search';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import OnboardingPage from '../Onboarding/OnboardingPage';
import Verify from '../SignUp/Verify';
import WrongLogin from '../Login/WrongLogin';
import WrongSignup from '../SignUp/WrongSignup';

function App() {
  return (
    <Router>
        <NavBar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/onboarding" component={OnboardingPage}/>
            <Route path="/verify-email" component={Verify}/>
            <Route path="/login-retry" component={WrongLogin}/>
            <Route path="/signup-retry" component={WrongSignup}/>
        </Switch>
    </Router>
  );
}

export default App;
