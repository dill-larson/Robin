import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './Onboarding.scss';

import OnboardingMenu from '../Components/OnboardingMenu';
import Page from '../Page/Page';
import Logo from "../illustrations/Logo"

export default class SkillsOnboarding extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(value) {

    }

    render() {
        return (
        <Page>
            <Row>
                <Col md={4}> 
                    <OnboardingMenu current="skills"></OnboardingMenu>
                </Col>
                <Col>
                    <Row style={{justifyContent:"space-between"}}>
                        <h1 className="onboarding-title">Skills</h1>
                        <Logo size="12rem" ></Logo>
                    </Row>
                </Col>
            </Row>
        </Page>
        )
    }
}