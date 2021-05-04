import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import './Results.scss';
import Logo from "../illustrations/Logo"
import JobCardResult from "./JobCardResult"
import Loading from "./Loading"
import axios from 'axios';

export default class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.searchUrl,
            jobs: [],
            informationPosted: false
        };
    }
    componentDidMount() {
        
        const params = {
            url : this.state.url
        };

  
        axios.get(`http://127.0.0.1:5000/scrape`, { params })
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
    
        return !this.state.jobs.length ?
        <Loading></Loading> :
        ( 
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
                            position={job.Title}
                            city={job.location}
                            description={job.Description}
                            score={job.score}
                            //skills={job.skills}
                        />
                        );
                    })}
                </div>
                
            </Container>
            
        );
     }
}