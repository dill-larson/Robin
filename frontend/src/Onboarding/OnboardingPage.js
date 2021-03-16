import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProjectsInputOnboarding from './ProjectInputOnboarding';
import ProjectsOnboarding from './ProjectsOnboarding';
import SkillsOnboarding from './SkillsOnboarding';
import ExperienceInputOnboarding from './ExperienceInputOnboarding';
import ExperienceOnboarding from './ExperienceOnboarding';
import EducationInputOnboarding from './EducationInputOnboarding';
import EducationOnboarding from './EducationOnboarding';
import GeneralOnboarding from './GeneralOnboarding';
import OnboardingMenu from './OnboardingMenu';
import Page from '../Page/Page';

export default function OnboardingPage(props) {
    const [progress, setProgress] = useState([0]);
    let { path, url } = useRouteMatch();
    

    function updateProgress() {
        setProgress(progress => [...progress, progress.length]);
    }

    function handleUserDataUpdate(obj, origin) {
        updateProgress();
        console.log(progress);
    }

    return(
        <Page>
            <Row>
                <Col md={4} className="mt-5"> 
                    <OnboardingMenu progress={progress} url={url}/>
                </Col>
                <Col className="mt-5">
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
                        <Route path={`${path}/experience/:projectId`} component={ProjectsInputOnboarding}/>
                        <Route path={`${path}/projects`}>
                            <ProjectsOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Page>
    );
}