import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProjectCard(props) {
    return ( 
        <Card className="onboarding-card">
            <Row>
                <Col md={10}>
                    <Card.Body>
                        <Card.Title><span className="text-light-accent">{props.name}</span></Card.Title>
                        <Card.Subtitle>{props.start_date} to {props.end_date}</Card.Subtitle>
                        <Card.Body>{props.about}</Card.Body>
                    </Card.Body>
                </Col>
                {/* <Col className="card-btns">
                    <Button as={Link} to={`/onboarding/projects/edit/${props.id}`} className="mb-2" variant="light-shade">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Col> */}
            </Row>
        </Card>
    );
}
