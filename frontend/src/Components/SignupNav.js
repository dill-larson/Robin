import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Page(props) {
    return (
        <div className="signup-nav ml-auto">
            <Col>
                <Row>
                    <Link to="/signup" className="signup-nav-link"> Sign Up</Link>
                    <p>|</p>
                    <Link to="/login" className="signup-nav-link"> Login</Link>
                </Row>
            </Col>
        </div>
    );
}