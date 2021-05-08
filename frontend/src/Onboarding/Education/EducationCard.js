import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function EducationCard(props) {
    return ( 
        <Card className="onboarding-card">
            <Row>
                <Col md={7}>
                    <Card.Body>
                        <Card.Title>{props.degree} in <span className="text-main-brand">{props.field_of_study}</span></Card.Title>
                        <Card.Subtitle>{props.school} - {props.start_date} to {props.graduation_date}</Card.Subtitle>
                        <Card.Subtitle className="mt-2">GPA: {props.gpa}</Card.Subtitle>
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
