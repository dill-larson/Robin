import React from 'react';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import SignupNav from '../Components/SignupNav';

export default function Header() {
    return (
        <Col>
            <Row>
                <NavBar/>
                <SignupNav/>
            </Row>
        </Col>
    );
}