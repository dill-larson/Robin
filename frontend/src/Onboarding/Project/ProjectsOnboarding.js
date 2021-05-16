import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../Onboarding.scss';
import axios from 'axios'

import Logo from "../../illustrations/Logo";
import ProjectCard from './ProjectCard';
export default class ProjectsOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                // {
                //     title: 'Robin',
                //     start_date: 'January 2020',
                //     end_date: 'May 2021',
                //     description: 'Resume Builder'
                // },
            ],
        };
    }
    componentDidMount() {
        const params = {
            email: sessionStorage.getItem('email')
        };
        axios.get(`http://ec2-54-193-142-115.us-west-1.compute.amazonaws.com/fetch/projects`, {params})
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
        return (
            <div>
                <Row className="onboarding-form">
                    <h1 className="form-title">Projects</h1>
                </Row>
                <Row className="onboarding-card-display">
                    {this.state.projects.length !== 0 && this.state.projects.data.map(project => {
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
                        <div className="py-2 px-2" style={{display: "flex"}}>
                            <Button
                                as={Link}
                                to="/onboarding/projects/create"
                                variant="light-shade" 
                                className="ml-auto"
                            >
                                Add
                            </Button>
                        </div>
                    </Card>
                </Row>
                <Row>
                    <Button 
                        className="text-white ml-auto" 
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
