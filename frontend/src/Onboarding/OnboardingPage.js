import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProjectsInputOnboarding from './Project/ProjectInputOnboarding';
import ProjectsOnboarding from './Project/ProjectsOnboarding';
import SkillsOnboarding from './Skills/SkillsOnboarding';
import ExperienceInputOnboarding from './Experience/ExperienceInputOnboarding';
import ExperienceOnboarding from './Experience/ExperienceOnboarding';
import EducationInputOnboarding from './Education/EducationInputOnboarding';
import EducationOnboarding from './Education/EducationOnboarding';
import GeneralOnboarding from './General/GeneralOnboarding';
import OnboardingMenu from './OnboardingMenu';
import Page from '../Page/Page';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Header from '../Components/Header';

export default function OnboardingPage(props) {
    const [progress, setProgress] = useState([0]);
    const [from, setFrom] = useState([]);
    let { path, url } = useRouteMatch();
    let loggedIn = sessionStorage.getItem('loggedIn');

    function updateProgress() {
        setProgress(progress => [...progress, progress.length]);
    }

    function handleUserDataUpdate(obj, origin) {
        if(!from.includes(origin)) {
            updateProgress();
            setFrom(from => [...from, origin]);
        }
    }
    

    if(loggedIn === "true"){
        return(
            <Page>
                <Col>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <Col md={4}> 
                            <OnboardingMenu progress={progress} url={url}/>
                        </Col>
                        <Col className="onboarding-form-wrapper">
                            <Switch>
                                <Route path={`${path}/general`}>
                                    <GeneralOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                                </Route>
                                <Route path={`${path}/education/create`} component={EducationInputOnboarding}/>
                                <Route path={`${path}/education/:eduId`} component={EducationInputOnboarding}/>
                                <Route path={`${path}/education`}>
                                    <EducationOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                                </Route>
                                <Route path={`${path}/experience/create`} component={ExperienceInputOnboarding}/>
                                <Route path={`${path}/experience/:jobId`} component={ExperienceInputOnboarding}/>
                                <Route path={`${path}/experience`}>
                                    <ExperienceOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                                </Route>
                                <Route path={`${path}/skills`}>
                                    <SkillsOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                                </Route>
                                <Route path={`${path}/projects/create`} component={ProjectsInputOnboarding}/>
                                <Route path={`${path}/projects/:projectId`} component={ProjectsInputOnboarding}/>
                                <Route path={`${path}/projects`}>
                                    <ProjectsOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Col>
            </Page>
        );
    }else{
        return(<Login></Login>)
    }
}