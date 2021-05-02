import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";
import JobCard from './JobCard';

export default class EducationOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                {
                    company: 'Google',
                    position: 'Software Engineer',
                    city: 'San Francisco',
                    start_date: 'Jan 2020',
                    end_date: 'Present',
                    rel_achievements: ''
                },
            ],
            informationPosted: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(null, "experience");
        this.setState({informationPosted: true});
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/skills'/>
        }
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Professional History</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Row className="onboarding-card-display">
                    {this.state.jobs.map(job => {
                        return (
                        <JobCard 
                            company={job.company}
                            position={job.position}
                            city={job.city}
                            start_date={job.start_date}
                            end_date={job.end_date}
                            rel_achievements={job.rel_achievements}
                        />
                        );
                    })}
                    {/* Add icon*/}
                    <Card className="onboarding-card">
                        <Row className="py-2 px-5">
                            <Button
                                as={Link}
                                to="/onboarding/experience/create"
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