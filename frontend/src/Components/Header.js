import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Logo from '../illustrations/Logo';
import SignupNav from '../Components/SignupNav';

export default function Header(props) {
    return (
        <Col>
            <Row>
                <Logo size="12rem"></Logo>
                <SignupNav/>
            </Row>
        </Col>
    );
}