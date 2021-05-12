import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../Onboarding.scss';
import axios from 'axios'
import Logo from "../../illustrations/Logo";
import JobCard from './JobCard';

export default class EducationOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                // {
                //     company: 'Google',
                //     title: 'Software Engineer',
                //     city: 'San Francisco',
                //     start_date: 'Jan 2020',
                //     end_date: 'Present',
                //     rel_achievements: ''
                // },
            ],
            informationPosted: false
        };
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/fetch/experience`)
          .then(res => {
            const jobs = res.data;
            this.setState({ jobs });
          })
      }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(null, "experience");
        this.setState({informationPosted: true});
    }

    render() {
        console.log(this.state.jobs)
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/skills'/>
        }
        return (
            <div>
                <Row className="onboarding-form">
                    <h1 className="form-title">Professional History</h1>
                </Row>
                <Row className="onboarding-card-display">
                    {this.state.jobs.length !== 0 && this.state.jobs.data.map(job => {
                        return (
                        <JobCard 
                            company={job.company}
                            position={job.title}
                            city={job.city}
                            start_date={job.start_date}
                            end_date={job.end_date}
                            rel_achievements={job.rel_achievements}
                        />
                        );
                    })}
                    {/* Add icon*/}
                    <Card className="onboarding-card">
                        <div className="py-2 px-2" style={{display: "flex"}}>
                            <Button
                                as={Link}
                                to="/onboarding/experience/create"
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