import React, { Component,useState } from 'react';
import { Button, Row, Col, Container, Form, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Logo from "../illustrations/Logo"
import Nav from "../Components/Nav"
import Illustration from "../illustrations/Error_illustration"
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
        this.state = {
            logedIn: false,
            wrongPassword:false,
            notConfirmed:false
        }
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
        this.setState({logedIn:true});
        },

        onFailure: err => {
        console.error("onFailure:", err);
        if(err.name == "UserNotConfirmedException"){
            console.error(err)
            this.setState({notConfirmed:true})
        }else{
            this.setState({wrongPassword:true});
        }
        },

        newPasswordRequired: data => {
        console.log("newPasswordRequired:", data);
        }
    });
    }
    render(){
        if(this.state.notConfirmed === true){
            return <Redirect to='/verify-email'></Redirect>
        }
        if(this.state.logedIn === true){
            return <Redirect to='/search'></Redirect>
        }
        return (
            <div style={pageStyle}>
                <Container>
                <Row>
                    <Logo size="12rem"></Logo>
                </Row>
                <Row >
                    <Col>
                    <Illustration size="30rem"></Illustration>
                    </Col>
                    <Col style={{height:"76vh"}}>
                        <Col >
                        <h1 style={{color:"#6153ae",fontSize: "3.5em"}}>Login</h1>
                        <div style={{backgroundColor:"#ff6666", borderRadius:"1rem", padding:"0.7rem"}}>
                            <p >The username and password you entered did not match our records. Double-check and try again.</p>
                        </div>
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
