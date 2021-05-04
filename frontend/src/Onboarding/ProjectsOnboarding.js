import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Onboarding.scss';
import axios from 'axios'

import Logo from "../illustrations/Logo";
import ProjectCard from './ProjectCard';
export default class ProjectsOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
               
            ],
        };
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/fetch/projects`)
          .then(res => {
            const projects = res.data;
            this.setState({ projects });
          })
      }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(null, "projects");
        this.setState({informationPosted: true});
    }

    render() {
        console.log(this.state.projects.data)
        if(this.state.informationPosted){
            return <Redirect to='/search'/>
        }
        if(this.state.projects.length === 0){
            return (
                <div>
                    <Row style={{justifyContent:"space-between"}}>
                        <h1 className="onboarding-title">Projects</h1>
                        <Logo size="12rem" ></Logo>
                    </Row>
                    <Row className="onboarding-card-display">
                        <Card className="onboarding-card">
                            <Row className="py-2 px-5">
                                <Button
                                    as={Link}
                                    to="/onboarding/projects/create"
                                    variant="light-shade" 
                                    className="onboarding-form-btn ml-auto"
                                >
                                    Add
                                </Button>
                            </Row>
                        </Card>
                    </Row>
                    <Row>
                        <Button 
                            className="onboarding-form-btn text-white ml-auto" 
                            variant="light-accent"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Next
                        </Button>
                    </Row>      
                </div>
            );
        } else {
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Projects</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Row className="onboarding-card-display">
                    {this.state.projects.data.map(project => {
                        return (
                        <ProjectCard 
                            name={project.title}
                            start_date={project.start_date}
                            end_date={project.end_date}
                            about={project.description}
                        />
                        );
                    })}
                    {/* Add icon*/}
                    <Card className="onboarding-card">
                        <Row className="py-2 px-5">
                            <Button
                                as={Link}
                                to="/onboarding/projects/create"
                                variant="light-shade" 
                                className="onboarding-form-btn ml-auto"
                            >
                                Add
                            </Button>
                        </Row>
                    </Card>
                </Row>
                <Row>
                    <Button 
                        className="onboarding-form-btn text-white ml-auto" 
                        variant="light-accent"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Next
                    </Button>
                </Row>      
            </div>
        );
    }}
}