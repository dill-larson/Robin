import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Home/Home.scss'
export default function Header(props) {
    return (
        <Row className="footer" md={{ span: 6, offset: 3 }}>
            <Col>
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
             <Col>
                <h3>Support</h3>
                <ul>
                    <li>
                        <Link className="footer-link">FAQ</Link>
                    </li>
                    <li>
                        <Link className="footer-link">Help center</Link>
                    </li>
                </ul>
             </Col>
             <Col>
                <h3>Company</h3>
                <ul>
                    <li>
                        <Link className="footer-link">About Us</Link>
                    </li>
                    <li>
                        <Link className="footer-link">How it works</Link>
                    </li>
                </ul>
             </Col>
        </Row>
    );
}