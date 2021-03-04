import React, { Component } from 'react';
import { Button, Row, Col, Container, Form, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Logo from "../illustrations/Logo"
import Nav from "../Components/Nav"
import Illustration from "../illustrations/Login_illustration"
import UserPool from '../UserPool';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const pageStyle = {
    height:"100%",
    color:"white",
    backgroundColor:"#d8d8e0"
}

export default class Login extends React.Component{
    validationSchema = yup.object({
        email: yup.string()
            .email("Invalid email")
            .required("Required"),
        password: yup.string()
            .min(6, "Password must be 6 or more characters")
            .required("Required"),
    });
    constructor(props) {
        super(props);
    }

    handleSubmit(value) {
      const user = new CognitoUser({
    Username: value.email,
    Pool: UserPool
  });
  const authDetails = new AuthenticationDetails({
    Username: value.email,
    Password: value.password
  });

  user.authenticateUser(authDetails, {
    onSuccess: data => {
      console.log("onSuccess:", data);
    },

    onFailure: err => {
      console.error("onFailure:", err);
    },

    newPasswordRequired: data => {
      console.log("newPasswordRequired:", data);
    }
  });
    }
    render(){
        return (
            <div style={pageStyle}>
                <Container >
                <Row >
                    <Col>
                     <Logo size="12rem"></Logo>
                    <div className="illustration">
                        <Illustration size = "28rem"></Illustration>
                    </div>
                    </Col>
                    <Col style={{height:"76vh", marginTop: "10rem"}}>
                        <Col >
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={this.validationSchema}
                        onSubmit={(values) => (this.handleSubmit(values))}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                            <Form onSubmit={handleSubmit} >
                                <h1 style={{color:"#6153ae",fontSize: "3.5em"}}>Login</h1>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                        className="form-input"
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={touched.email && errors.email}
                                        />
                                        <Form.Text className="form-error">{touched.email && errors.email}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label >Password</Form.Label>
                                        <Form.Control
                                        className="form-input"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        isInvalid={touched.password && errors.password}
                                         />
                                        <Form.Text className="form-error">{touched.password && errors.password}</Form.Text>
                                    </Form.Group>
                                    <Row style={{justifyContent:"space-between"}}>
                                        <p>I don't have an account yet - <Link to="/signup" className="form-link"> Sign Up</Link></p>
                                        <Button  variant="light" type="submit" className="form-submit" >
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
