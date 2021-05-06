import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Logo from '../illustrations/Logo';
import SignupNav from '../Components/SignupNav';

export default function Header() {
    return (
        <Col>
            <Row>
                <Logo size="12rem" />
                <SignupNav/>
            </Row>
        </Col>
    );
}