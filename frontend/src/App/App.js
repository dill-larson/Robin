import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* components */
import Home from '../Home/Home';
import Search from '../Search/Search';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import OnboardingPage from '../Onboarding/OnboardingPage';
import Verify from '../SignUp/Verify';
import Results from '../Results/Results';


function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/search/:url" component={Results}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/verify-email" component={Verify}/>
            <Route path="/onboarding" component={OnboardingPage}/>
        </Switch>
    </Router>
  );
}

export default App;
