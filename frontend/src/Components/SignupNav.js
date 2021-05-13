import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Page(props) {
    return (
        <Row className="signup-nav">
                <Link to="/signup" className="signup-nav-link"> Sign Up</Link>
                <p>|</p>
                <Link to="/login" className="signup-nav-link"> Login</Link>
        </Row>
    );
}