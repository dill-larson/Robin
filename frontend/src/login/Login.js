import React, { Component } from 'react';
import { Button, Row, Col, Container, Form, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Logo from "../illustrations/Logo"
import Illustration from "../illustrations/Login_illustration"

const pageStyle = {
    color:"white",
    height:"100vh",
    backgroundColor:"#d8d8e0"
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
            <div style={pageStyle}>
                <Container>
                <Col><Logo size="150px"></Logo></Col>
                <Row lg={2}>                
                    <Col >
                        <Col>
                            <Illustration size = "90%"></Illustration>
                        </Col>
                    </Col>
                    <Col > 
                        <Col >
                        <Formik 
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                  errors.email = 'Required';
                                } else if (
                                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                  errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'Required';
                                  }
                                return errors;
                              }
                            
                            }
                              onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                  alert(JSON.stringify(values, null, 2));
                                  setSubmitting(false);
                                }, 400);
                              }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                            <Form onSubmit={handleSubmit}>
                                <h1 style={{color:"#6153ae",fontSize: "3.5em"}}>Login</h1>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{borderRadius:"10px", width:"80%"}} 
                                        />
                                        <Form.Text className="text-danger">{touched.email && errors.email}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label >Password</Form.Label>
                                        <Form.Control 
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        style={{borderRadius:"10px", width:"80%"}} />
                                        <Form.Text className="text-danger">{touched.password && errors.password}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formCheckbox">
                                        <Form.Check type="checkbox" label="Remember me on this device" style={{color:"white"}} />
                                    </Form.Group>
        
                                    <Row style={{justifyContent:"space-between", width:"80%"}}>
                                        <p>I don't have an account yet - <a href= "/signup" style={{color: "#6153ae"}}> Sign Up</a></p>
                                        <Button  variant="light" type="submit" disabled={isSubmitting} style={buttonStyle}>
                                            Next
                                        </Button>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                            
                        </Col>  
                        
                    </Col>
                </Row>

            </Container>
            </div>
        )
    }

}