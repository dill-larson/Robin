import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../Onboarding.scss';
import axios from 'axios';

import Pill from '../../Pill/Pill';


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
    componentDidMount() {
        const params = {
            email: sessionStorage.getItem('email')
        };
        axios.get(`http://ec2-54-193-142-115.us-west-1.compute.amazonaws.com/fetch/skills`, {params})
          .then(res => {
            const skills_array = res.data
            console.log(skills_array)
            // const skills_array = res.data;
            // skills_array = skills_array.split(",").trim()
            // this.setState({ skills_array });
          })
      }
    handleClick(e){
        e.preventDefault();
        const skills = this.state.skills_array.join(",");
        const data = {
            email: sessionStorage.getItem('email'),
            skills: skills,
        }
         axios.post('http://127.0.0.1:5000/onboard/skills',{data})
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
                <Row className="onboarding-form">
                    <h1 className="form-title">Skills</h1>
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
                    <div className="form-footer">
                        <Button type="submit" variant="dark-accent" className="text-white">
                            Add
                        </Button>
                        <Button 
                            onClick={this.handleClick}
                            variant="light-accent" 
                            className="text-white ml-auto"
                        >
                            Next
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}