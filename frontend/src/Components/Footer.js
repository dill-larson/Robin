import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Home/Home.scss'

export default function Header(props) {
    return (
        <Col className="footer">
            <Row style={{justifyContent: "center"}}>
                <Col md="2">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            <Link className="footer-link">Email</Link>
                        </li>
                        <li>
                            <Link className="footer-link">LinkedIn</Link>
                        </li>
                    </ul>
                </Col>
                <Col md="2">
                    <h3>Support</h3>
                    <ul>
                        <li>
                            <Link className="footer-link" to="/how-it-works">FAQ</Link>
                        </li>
                    </ul>
                </Col>
                <Col md="2">
                    <h3>Company</h3>
                    <ul>
                        <li>
                            <Link className="footer-link" to="/about-us">About Us</Link>
                        </li>
                        <li>
                            <Link className="footer-link" to="/how-it-works">How It Works</Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Col>
    );
}