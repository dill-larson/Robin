import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../Onboarding.scss';
import axios from 'axios'
import Logo from "../../illustrations/Logo";
import EducationCard from './EducationCard';

export default class EducationOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            educations: [],
            informationPosted: false
        };
    }
    componentDidMount() {
        const params = {
            email: sessionStorage.getItem('email')
        };
        axios.get(`https://ec2-54-193-142-115.us-west-1.compute.amazonaws.com/fetch/education`, {params})
            .then(res => {
                const educations = res.data;
                this.setState({ educations });
            })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserDataUpdate(null, "education");
        this.setState({informationPosted: true});
    }

    render() {
        console.log(this.state.educations)
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/experience'/>
        } 
        return (
            <div>
                <Row className="onboarding-form">
                    <h1 className="form-title">Degrees</h1>
                </Row>
                <Row className="onboarding-card-display">
                
                    {this.state.educations.length !== 0 && this.state.educations.data.map((edu, index) => {
                        return (
                        <EducationCard
                            key={index}
                            degree={edu.degree}
                            field_of_study={edu.major}
                            school={edu.school}
                            gpa={edu.gpa}
                            start_date={edu.start_date}
                            graduation_date={edu.end_date}
                        />
                        );
                    })}
                    {/* Add icon*/}
                    <Card className="onboarding-card">
                        <div className="py-2 px-2" style={{display: "flex"}}>
                            <Button
                                as={Link}
                                to="/onboarding/education/create"
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
