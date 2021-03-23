import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";
import ProjectCard from './ProjectCard';
export default class ProjectsOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    name: 'Robin',
                    start_date: 'January 2021',
                    end_date: 'May 2021',
                    about: 'AI resume builder'
                }
            ],
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(null, "projects");
        this.setState({informationPosted: true});
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/search'/>
        }
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Projects</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Row className="onboarding-card-display">
                    {this.state.projects.map(project => {
                        return (
                        <ProjectCard 
                            name={project.name}
                            start_date={project.start_date}
                            end_date={project.end_date}
                            about={project.about}
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
    }
}