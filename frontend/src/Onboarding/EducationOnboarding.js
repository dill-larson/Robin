import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";
import EducationCard from './EducationCard';

export default class EducationOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            educations: [
                {
                    degree: 'Bachelors of Science',
                    field_of_study: 'Computer Science',
                    school: 'San Jose State University',
                    gpa: '4.0',
                    start_date: 'August 2018',
                    graduation_date: 'May 2021'
                },
            ],
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(null, "education");
    }

    render() {
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Degrees</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Row className="onboarding-card-display">
                    {this.state.educations.map(edu => {
                        return (
                        <EducationCard 
                            degree={edu.degree}
                            field_of_study={edu.field_of_study}
                            school={edu.school}
                            gpa={edu.gpa}
                            start_date={edu.start_date}
                            graduation_date={edu.graduation_date}
                        />
                        );
                    })}
                    {/* Add icon*/}
                    <Card className="onboarding-card">
                        <Row className="py-2 px-5">
                            <Button
                                as={Link}
                                to="/onboarding/education/create"
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