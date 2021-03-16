import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function JobCard(props) {
    return ( 
        <Card className="onboarding-card">
            <Row>
                <Col md={7}>
                    <Card.Body>
                        <Card.Title><span className="text-main-brand">{props.position}</span> at {props.company}</Card.Title>
                        <Card.Subtitle>{props.city} - {props.start_date} to {props.end_date}</Card.Subtitle>
                        <Card.Body>{props.rel_achievements}</Card.Body>
                    </Card.Body>
                </Col>
                <Col className="mt-3">
                    <Button 
                        variant="light-shade" 
                        className="onboarding-form-btn"
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="brand-danger" 
                        className="onboarding-form-btn mt-2"
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}
