import React,{useState} from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import UserPool from '../UserPool';

/* styling */
import './SignUp.scss';

/* components */
import Page from '../Page/Page';
import Logo from "../illustrations/Logo"
import Header from '../Components/Header';

/* svgs */
import Checklist from '../illustrations/Checklist';


export default class SignUp extends React.Component {
    validationSchema = yup.object({
        name: yup.string()
            .required("Required"),
        email: yup.string()
            .email("Invalid email")
            .required("Required"),
        password: yup.string()
            .required("Required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Your password must contain 8 characters, at least one:\n uppercase,\n lowercase, \n  number and \n special case character"
              ),
        confirm_password: yup.string()
            .required("Required")
            .oneOf(
                [yup.ref('password'), null],
                "Passwords must match"
            ).matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Your password must contain 8 characters, at least one:\n uppercase,\n lowercase, \n  number and \n special case character"
            )
    });

    constructor(props) {
        super(props);
        this.state = {
            signedUp: false,
            alreadyExists:false
        }

    }
    handleSubmit(value) {
      UserPool.signUp(value.email, value.password, [], null, (err, data) => {
            if (err) {
                if(err.name == "UsernameExistsException"){
                    this.setState({alreadyExists:true})
                }
            } else {
                this.setState({signedUp:true});
            }
        });
    }  
    
    render() {
        if(this.state.signedUp === true){
            return <Redirect to='/verify-email'></Redirect>
        }

        return (
        <Page>
            <Col>
                <Row>
                    <Col>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="signup-illustration">
                            <Checklist  size="25rem"/>
                        </div>
                    </Col>
                    <Col>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                                confirm_password: ''
                            }}
                            validationSchema={this.validationSchema}
                            onSubmit={(values) => (this.handleSubmit(values))}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors,
                            }) => (
                                <Form className="form-signup" onSubmit={handleSubmit}>
                                    <h1 className="form-header text-center">Sign Up</h1>
                                    { this.state.alreadyExists &&
                                    <div className="form-error">
                                        <p>The username you entered is already being used. <br/> Please <Link to="/login" className="form-link text-white">Login</Link></p>
                                    </div>
                                    }
                                    <Form.Group controlId="name">
                                        <Form.Label className="form-label">Name</Form.Label>
                                        <Form.Control
                                            className="form-input"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={touched.name && errors.name}
                                        />
                                        <Form.Text className="form-error-text">{touched.name && errors.name}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label className="form-label">Email</Form.Label>
                                        <Form.Control
                                            className="form-input"
                                            type="email"
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
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && errors.password}
                                        />
                                        <Form.Text className="form-error-text">{touched.password && errors.password}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="confirm_password">
                                        <Form.Label className="form-label">Confirm Password</Form.Label>
                                        <Form.Control
                                            className="form-input"
                                            type="password"
                                            value={values.confirm_password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.confirm_password && !errors.confirm_password}
                                            isInvalid={touched.confirm_password && errors.confirm_password}
                                        />
                                        <Form.Text className="form-error-text">{touched.confirm_password && errors.confirm_password}</Form.Text>
                                    </Form.Group>
                                    <Row>
                                        <p className="text-white">I already have an account - <Link to="/login" className="text-main-brand">Login</Link></p>
                                        <Button variant="dark-shade" className="form-submit ml-auto" type="submit" id="submit">Next</Button>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Col>
        </Page>
        );
    }
}
