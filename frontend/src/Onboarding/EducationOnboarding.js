import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Onboarding.scss';
import axios from 'axios'
import Logo from "../illustrations/Logo";
import EducationCard from './EducationCard';

export default class EducationOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            educations: [
                // {
                //     degree: 'Bachelors of Science',
                //     field_of_study: 'Computer Science',
                //     school: 'San Jose State University',
                //     gpa: '4.0',
                //     start_date: 'August 2018',
                //     graduation_date: 'May 2021'
                // },
            ],
            informationPosted: false
        };
    }
    componentDidMount() {
        const params = {
            email: sessionStorage.getItem('email')
        };
        axios.get(`http://127.0.0.1:5000/fetch/education`, {params})
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
        
        if(this.state.educations.length === 0){
            return(<div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Degrees</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Row className="onboarding-card-display">
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
            )
        }else{
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Degrees</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Row className="onboarding-card-display">
                
                    {this.state.educations.data.map(edu => {
                        return (
                        <EducationCard 
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

}