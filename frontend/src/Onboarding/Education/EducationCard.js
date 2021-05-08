import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function EducationCard(props) {
    return (
        <Card className="onboarding-card">
            <Row>
                <Col md={10}>
                    <Card.Body>
                        <Card.Title>{props.degree} in <span className="text-light-accent">{props.field_of_study}</span></Card.Title>
                        <Card.Subtitle>{props.school} - {props.start_date} to {props.graduation_date}</Card.Subtitle>
                        <Card.Subtitle className="mt-2">GPA: {props.gpa}</Card.Subtitle>
                    </Card.Body>
                </Col>
                <Col className="card-btns">
                    <Button as={Link} to={`/onboarding/education/edit/${props.id}`} className="mb-2" variant="light-shade">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Col>
            </Row>
        </Card>
    );
}
