import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ResultPill from './ResultPill'
import Scroll from './Scroll';

export default function JobCard(props) {
    return ( 
        <Card className="results-card">
            <Row>
                <Col md={3}>
                    <Card.Body>
                        <Card.Title>
                            <span className="results-title-company">{props.company}</span> 
                            <br></br>
                            
                            
                        </Card.Title>
                    
                    </Card.Body>
                </Col>
                <Col md={7}>
                    <Col>
                        {/* <Scroll>
                            <Card.Body className="result-job-description">{props.description}</Card.Body>
                        </Scroll> */}
                        
                        <h5 className="results-position"> Position: <span className="results-info">{ props.position}</span>  </h5>
                        <h5 className="results-location"> Location: <span className="results-info">{props.city}</span> </h5>
                        <h5 className="results-score">Score: <span className="results-info">{props.score}</span> </h5>
                    </Col>
                    <Row>
                        
                    {/* {props.skills.map((skill,i) => {
                        return (
                        <ResultPill name= {skill} variant="dark-accent"></ResultPill>
                        );
                    })} */}
                    </Row>
                </Col>
                <Col >
                    <Row>
                        <Button 
                            variant="dark-shade" 
                            className="results-resume-button"
                        >
                            See tailored resume
                        </Button>
                    </Row>
                    <Row>
                        <Button 
                            variant="light-accent text-white" 
                            className="results-apply-button"
                        >
                            Apply
                        </Button>

                    </Row>
                    
                </Col>
            </Row>
        </Card>
    );
}
