import React from 'react';
import { Button, Card, Col, Row, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ResultPill from './ResultPill'
import Scroll from './Scroll';
import createResume from '../PDF/PDF';

export default function JobCard(props) {
    let email = sessionStorage.getItem('email');
    function handleClick(e){
        e.preventDefault();
        console.log(props.description);
        createResume(email, props.description);
    }
    return ( 
        <Card className="results-card" style={{ backgroundColor:"#d8d8e0",border:"none"}}>
            <Row>
                <Col md={4}>
                    <Card.Body>
                        <Card.Title>
                            <span className="results-title-company">{props.company}</span> 
                            <h5 className="results-position"> Position: <span className="results-info">{ props.position}</span>  </h5>
                            <h5 className="results-location"> Location: <span className="results-info">{props.city}</span> </h5>
                            <h5 className="results-score">Score: <span className="results-info">{props.score}</span> </h5>

                        </Card.Title>
                    
                    </Card.Body>
                </Col>
                <Col md={6}>
                    <Col>
                            
                    <Accordion defaultActiveKey="0" >
                        <Card style={{backgroundColor:"#d8d8e0", border:"none"}}>
                            <Card.Header style={{backgroundColor:"#d8d8e0" }}>
                            <Accordion.Toggle as={Button} variant="light-shade text-dark-accent" eventKey="1" style={{borderRadius:"2rem", fontSize:"1.1em",fontWeight:"3rem"}}>
                            
                            <svg className="expand_arrow" width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.97063 6.79241C8.49064 6.3921 8.49064 5.6079 7.97063 5.20759L1.60999 0.311171C0.952425 -0.195026 -5.99994e-07 0.273738 -5.63721e-07 1.10358L-1.35662e-07 10.8964C-9.93882e-08 11.7263 0.952425 12.195 1.60999 11.6888L7.97063 6.79241Z" fill="white"/>
                            </svg> Description 
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body className="result-job-description">
                                <Scroll>
                                {props.description}
                                </Scroll></Card.Body>
                            </Accordion.Collapse>
                        </Card>
                     </Accordion>                    
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
                            onClick={handleClick}
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
