import React, { Component } from 'react';
import { Button, Row, Col, Container, Form, Table } from 'react-bootstrap';


export default class Login extends React.Component{
    render(){
        return (
            <Container fluid style={{backgroundColor:"#d8d8e0"}}>
                <Col>Robin</Col>
                <Row>                
                    <Col xs={6}>
                        <Col xs={3}>
                            Image
                        </Col>
                    </Col>
                    <Col xs={6}> 
                        <Col xs={8}>
                            <Form>
                            <h1 style={{color:"#6153ae"}}>Login</h1>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{color:"white"}} >Email address</Form.Label>
                                    <Form.Control type="email" style={{borderRadius:"10px"}} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{color:"white"}} >Password</Form.Label>
                                    <Form.Control type="password" style={{borderRadius:"10px"}} />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me on this device" style={{color:"white"}} />
                                </Form.Group>
                                <Button  variant="light" type="submit" style={{borderRadius:"15px", color: "#133c8f", justifyContent:"flex-end"}}>
                                    Next
                                </Button>
                                
                            </Form>
                        </Col>  
                        
                    </Col>
                </Row>

            </Container>
        
        )
    }

}