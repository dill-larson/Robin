import React from 'react';
import { Badge, Button, Card, Col, Row, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Scroll from './Scroll';
import createResume from '../PDF/PDF';

export default function JobCard(props) {
    function handleClick(e){
        e.preventDefault();
        
        let email = sessionStorage.getItem('email');
        createResume(email, props.description);
    }

    return ( 
        <Card className="results-card">
            <Row>
                <Col md={4}>
                    <Card.Header className="card-header">
                        <h1 className="company-title">{props.company}</h1>
                    </Card.Header>
                    <Card.Body className="card-body">
                        <h5>
                            <Badge pill variant="main-brand" className="info">{props.position}</Badge>
                        </h5>
                        <h5>
                            <Badge pill variant="dark-accent" className="info">{props.city}</Badge>
                        </h5>
                        <h5>
                            <Badge pill variant="light-accent" className="info">Percent Match: {props.score}%</Badge>
                        </h5>
                    </Card.Body>
                </Col>
                <Col md={6}>
                    <Accordion>
                        <Card>
                            <Card.Header className="card-header">
                                <Accordion.Toggle as={Button} variant="dark-accent" className="text-white" eventKey="1">
                                    View Description 
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="card-body job-description y-scrollable">
                                    {props.description}  
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                     </Accordion>                    
                </Col>
                <Col className="card-btns">
                    <div>
                        <Button onClick={handleClick} variant="dark-shade">
                            Tailored Resume
                        </Button>
                        <Button as={Link} to={props.link} variant="light-accent" className="text-white mt-2">
                            Apply
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    );
}
