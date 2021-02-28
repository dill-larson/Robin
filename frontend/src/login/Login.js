import React, { Component } from 'react';
import { Button, Row, Col, Container, Form, Table } from 'react-bootstrap';
import Logo from "../illustrations/Logo"
import Illustration from "../illustrations/Login_illustration"

const pageStyle = {
    color:"white"
}


const buttonStyle = {
    color: "#133c8f",
    borderRadius: "15px",
    width:"80px",
    height:"35px",
    textAlign: "center"
}
export default class Login extends React.Component{
    render(){
        return (
            <div style={{height:"100vh", backgroundColor:"#d8d8e0"}}>
                <Container style={pageStyle}>
                <Col><Logo size="150px"></Logo></Col>
                <Row lg={2}>                
                    <Col >
                        <Col>
                            <Illustration size = "90%"></Illustration>
                        </Col>
                    </Col>
                    <Col > 
                        <Col >
                            <Form>
                                <h1 style={{color:"#6153ae",fontSize: "3.5em"}}>Login</h1>
                            <Form.Group controlId="formEmail">
                                <Form.Label >Email address</Form.Label>
                                    <Form.Control type="email" style={{borderRadius:"10px", width:"80%"}} />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label >Password</Form.Label>
                                    <Form.Control type="password" style={{borderRadius:"10px", width:"80%"}} />
                                </Form.Group>
                                <Form.Group controlId="formCheckbox">
                                    <Form.Check type="checkbox" label="Remember me on this device" style={{color:"white"}} />
                                </Form.Group>
            
                                <Row style={{justifyContent:"space-between", width:"80%"}}>
                                    <p>I don't have an account yet - <a href= "/signup" style={{color: "#6153ae"}}> Sign Up</a></p>
                                    <Button  variant="light" type="submit" style={buttonStyle}>
                                        Next
                                    </Button>
                                </Row>
                            </Form>
                        </Col>  
                        
                    </Col>
                </Row>

            </Container>
            </div>
        )
    }

}