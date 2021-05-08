import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

/* styling */
import './Login.scss';

/* components */
import Page from '../Page/Page';
import Header from '../Components/Header';

/* svgs */
import Illustration from "../illustrations/Login_illustration"

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from '../UserPool';

export default class Login extends React.Component{
    validationSchema = yup.object({
        email: yup.string()
            .email("Invalid email")
            .required("Required"),
        password: yup.string()
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
        sessionStorage.setItem('email', value.email);
        sessionStorage.setItem('loggedIn', "true");
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
        if(this.state.wrongPassword === true){
            return <Redirect to='/login-retry'></Redirect>
        }
        if(this.state.logedIn === true){
            return <Redirect to='/onboarding/general'></Redirect>
        }
        return (
            <div className="login-page">
                <Page>
                    <Col>
                        <Row>
                            <Header/>
                        </Row>
                        <Row>
                            <Col>
                                <Illustration size = "28rem"/>
                            </Col>
                            <Col className="login-form">
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
                                        <h1 className="form-header">Login</h1>
                                        <Form.Group controlId="email">
                                            <Form.Label className="form-label">Email</Form.Label>
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
                                            <Form.Text className="form-error-text">{touched.email && errors.email}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label className="form-label">Password</Form.Label>
                                            <Form.Control
                                            className="form-input"
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            isInvalid={touched.password && errors.password}
                                            />
                                            <Form.Text className="form-error-text">{touched.password && errors.password}</Form.Text>
                                        </Form.Group>
                                        <div className="form-footer">
                                            <span>I don't have an account yet - <Link to="/signup" className="form-link"> Sign Up</Link></span>
                                            <Button variant="dark-shade" className="form-submit ml-auto" type="submit" id="submit">Next</Button>
                                        </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                </Page>
            </div>
        );
    }

}
