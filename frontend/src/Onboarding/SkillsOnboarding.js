import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";

export default class SkillsOnboarding extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            skills_input: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(e, "skills");
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({skills_input: e.target.value});
    }

    render() {
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Skills</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Form className="onboarding-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group controlId="skills_input">
                        <Form.Label className="onboarding-form-label">Skills</Form.Label>
                        <Form.Text className="text-muted">Separated by commas (",")</Form.Text>
                        <Form.Control
                            as="textarea"
                            className="onboarding-form-input"
                            value={this.state.skills_input}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </Form.Group>
                    <Row>
                        <Button 
                            type="submit"
                            variant="light-accent" 
                            className="onboarding-form-btn text-white ml-auto"
                        >
                            Next
                        </Button>
                    </Row>
                </Form>
            </div>
        );
    }
}