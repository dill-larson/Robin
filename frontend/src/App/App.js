import React from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './App.scss';

import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import GeneralOnboarding from '../SignUp/GeneralOnboarding';
import EducationHome from '../SignUp/EducationOnboarding';
import EducationInput from '../SignUp/EducationInputOnboarding';
import EducationExtras from '../SignUp/EducationExtrasOnboarding';
import ExperienceHome from '../SignUp/ExperienceOnboarding';
import Skills from '../SignUp/SkillsOnboarding';
import ProjectsHome from '../SignUp/ProjectsOnboarding';


function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/onboarding-general" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-education-1" component={EducationHome}/>
            <Route exact path="/onboarding-education-2" component={EducationInput}/>
            <Route exact path="/onboarding-education-3" component={EducationExtras}/>
            <Route exact path="/onboarding-experience-1" component={ExperienceHome}/>
            <Route exact path="/onboarding-experience-2" component={GeneralOnboarding}/>
            <Route exact path="/onboarding-skills" component={Skills}/>
            <Route exact path="/onboarding-projects-1" component={ProjectsHome}/>
            <Route exact path="/onboarding-projects-2" component={GeneralOnboarding}/>
        </Switch>
    </Router>
  );
}

export default App;
