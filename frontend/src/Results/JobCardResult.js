import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ResultPill from './ResultPill'

export default function JobCard(props) {
    return ( 
        <Card className="results-card">
            <Row>
                <Col md={3}>
                    <Card.Body>
                        <Card.Title>
                            <span className="results-title-company">{props.company}</span> 
                            <br></br>
                            <br></br>
                            <span className="results-title">{props.position}</span> 
                            <br></br>
                            <span className="results-title">{props.city}</span>
                            
                        </Card.Title>
                    
                    </Card.Body>
                </Col>
                <Col md={7}>
                    <Row>
                        <Card.Body className="result-job-description">{props.description}</Card.Body>
                    </Row>
                    <Row>
                        
                    {props.skills.map((skill,i) => {
                        return (
                        <ResultPill name= {skill} variant="dark-accent"></ResultPill>
                        );
                    })}
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
