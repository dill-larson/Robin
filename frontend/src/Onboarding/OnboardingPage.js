import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

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
                <Col md={4}> 
                    <OnboardingMenu progress={progress} url={url}/>
                </Col>
                <Col>
                    <Switch>
                        <Route path={`${path}/general`}>
                            <GeneralOnboarding onUserDataUpdate={handleUserDataUpdate}/>
                        </Route>
                        <Route path={`${path}/education`} component={GeneralOnboarding} />
                        <Route path={`${path}/experience`} component={GeneralOnboarding} />
                        <Route path={`${path}/skills`} component={GeneralOnboarding} />
                        <Route path={`${path}/projects`} component={GeneralOnboarding} />
                    </Switch>
                </Col>
            </Row>
        </Page>
    );
}