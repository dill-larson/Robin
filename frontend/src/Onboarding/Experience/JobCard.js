import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function JobCard(props) {
    return ( 
        <Card className="onboarding-card">
            <Row>
                <Col md={10}>
                    <Card.Body>
                        <Card.Title><span className="text-light-accent">{props.position}</span> at {props.company}</Card.Title>
                        <Card.Subtitle>{props.city} - {props.start_date} to {props.end_date}</Card.Subtitle>
                        <Card.Body>{props.rel_achievements}</Card.Body>
                    </Card.Body>
                </Col>
                {/* <Col className="card-btns">
                <Button as={Link} to={`/onboarding/experience/edit/${props.id}`} className="mb-2" variant="light-shade">
                        Edit
                    </Button>
                    <Button variant="danger">
                        Delete
                    </Button>
                </Col> */}
            </Row>
        </Card>
    );
}
