import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import '../Results/Results.scss';

import Logo from "../illustrations/Logo";
import JobCardResult from "./JobCardResult"

export default class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                {
                    company: 'Google',
                    position: 'Software Engineer',
                    city: 'San Francisco',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum egestas dolor. Sed nec libero sed dui efficitur interdum vel sed sem. Mauris iaculis tristique.',
                    skills: ['Java', 'mySQL', 'Python']
                },
                {
                    company: 'Facebook',
                    position: 'Product Manager',
                    city: 'San Francisco',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum egestas dolor. Sed nec libero sed dui efficitur interdum vel sed sem. Mauris iaculis tristique. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    skills: ['Leadership', 'Communication', 'Risk Management', 'Cost Management', "Task Management", "Quality Management"]
                },{
                    company: 'Apple',
                    position: 'Sotware Engineer',
                    city: 'Cupertino',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum egestas dolor. Sed nec libero sed dui efficitur interdum vel sed sem. Mauris iaculis tristique. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    skills: ["Objective-C", "Swift", "C++", "Design"]
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
       
        return (
            <Container>
                <Row>
                    <Logo size="12rem"></Logo>
                    <h1 className="search-title"> Job Search Results</h1>
                </Row>
                <div className="results-container">
                {this.state.jobs.map(job => {
                        return (
                        <JobCardResult 
                            company={job.company}
                            position={job.position}
                            city={job.city}
                            description={job.description}
                            skills={job.skills}
                        />
                        );
                    })}
                </div>
                
            </Container>
            
        );
    }
}