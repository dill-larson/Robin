import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Onboarding.scss';
import axios from 'axios';

import Logo from "../illustrations/Logo";
import Pill from '../Pill/Pill';


export default class SkillsOnboarding extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            // skills_input: '',
            current_skill: '',
            skills_array: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        e.preventDefault();
        const skills = this.state.skills_array.join(",");
         axios.post('http://127.0.0.1:5000/onboard/skills',{skills})
         .then(res => {
            console.log('Printing skills request data')
            console.log(res.data);
            
        })
        .catch(err => {
            console.log(err);
        });
        this.props.onUserDataUpdate(null, "skills");
        this.setState({informationPosted:true});
    }
    handleKeypress(e) {
        
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        this.handleSubmit(e);
      }
    };

    handleSubmit(e) {
        e.preventDefault();
        var new_skills = this.state.skills_array.concat(this.state.current_skill.trim());
        this.setState({skills_array: new_skills});
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({current_skill: e.target.value});
        
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
                <div className="results-container">
                {this.state.skills_array.map((skill,index)=>{
                        return (
                        <Pill name = {skill}  variant="main-brand" array={this.state.skills_array}> </Pill>
                        );
                    })}
                </div>
                
                <Form className="onboarding-form" onSubmit={(e) => this.handleSubmit(e)} >
                    <Form.Group controlId="skills_input" style={{marginTop:"2rem",height:"70%", }}>
                        <Form.Text className="text-muted">Add you skill by clicking add or pressing enter</Form.Text>
                        <Form.Control
                            type="text"
                            className="onboarding-form-input"
                            value={this.state.skills_input}
                            onChange={(e) => this.handleChange(e)}
                            onKeyPress={this.handleKeypress}
                            
                        />
                    </Form.Group>
                    <Button 
                           type="submit"
                            variant="dark-accent" 
                            className="onboarding-form-btn text-white ml-auto"
                    >
                            Add
                        </Button>
                   
                    
                    <Row>
                        
                        <Button 
                            onClick={this.handleClick}
                            style={{marginTop:"3rem"}}
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