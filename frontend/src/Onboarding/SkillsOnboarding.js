import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Onboarding.scss';
import axios from 'axios';

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
        const skills = this.state.skills_input;
        
         axios.post('http://127.0.0.1:5000/onboard/skills',{skills})
         .then(res => {
            console.log('Printing skills request data')
            console.log(res.data);
            // this.props.onUserDataUpdate(null, "skills");
            // this.setState({informationPosted:true});
        })
        .catch(err => {
            console.log(err);
        });
        this.props.onUserDataUpdate(null, "skills");
        this.setState({informationPosted:true});
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({skills_input: e.target.value});
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/projects'/>
        }
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