import React from 'react';
import { Button, Col, Form, Row, InputGroup,FormControl } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";

export default class GeneralOnboarding extends React.Component {
    validationSchema = yup.object({
        name: yup.string()
            .required("Required"),
        email: yup.string()
            .email("Invalid email")
            .required("Required"),
        phone: yup.string().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Phone number is not valid')
            .required("Required")
            .min(10),
        website: yup.string()
            .url("Invalid url"),
        linkedin: yup.string().required("Required"),
        github: yup.string().required("Required"),
    });

    constructor(props) {
        super(props);

        this.state = {
            informationPosted: false
        }
    }
    postValues(value){
        this.setState({informationPosted:true});
        this.props.onUserDataUpdate(value, "general");
        
        axios.post("http://127.0.0.1:5000/onboard/contact", {
            name: value.name,
            phone: value.phone,
            email: value.email,
            website: value.website,
            linkedin: value.linkedin,
            github: value.github
        })
            .then(res => { //successful PUT
                console.log(res)
                // this.setState({informationPosted:true});
                // this.props.onUserDataUpdate(value, "general");
            })
            .catch(error => { //error occurred
                console.error(error);
            });
    }


    handleSubmit(value) {
        this.postValues(value);        
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/education'/>
        }
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">General Information</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Formik
                        initialValues={{
                            name: '',
                            phone: '',
                            email: '',
                            website: '',
                            linkedin: '',
                            github: '',
                            
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
                            <Form className="onboarding-form" onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md={8} controlId="name">
                                        <Form.Label className="onboarding-form-label">Full name</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={touched.name && errors.name}
                                        />
                                        <Form.Text className="form-error">{touched.name && errors.name}</Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="phone">
                                        <Form.Label className="onboarding-form-label">Phone Number</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.phone && !errors.phone}
                                            isInvalid={ touched.phone && errors.phone}
                                        />
                                        <Form.Text className="form-error">{touched.phone && errors.phone}</Form.Text>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label className="onboarding-form-label">Email</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && errors.email}
                                        />
                                        <Form.Text className="form-error">{touched.email && errors.email}</Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="website">
                                        <Form.Label className="onboarding-form-label">Personal Website</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="url"
                                            placeholder="http://www.personal-website.com"
                                            value={values.website}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.webstie && !errors.website}
                                            isInvalid={touched.website && errors.website}
                                        />
                                        <Form.Text className="form-error">{touched.website && errors.website}</Form.Text>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} controlId="linkedin">
                                        <Form.Label className="onboarding-form-label">LinkedIn</Form.Label>
                                        <InputGroup className="onboarding-form-input">
                                            <InputGroup.Prepend className="onboarding-form-label">
                                            <InputGroup.Text>@</InputGroup.Text>
                                            </InputGroup.Prepend>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            placeholder="Username"
                                            value={values.linkedin}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.linkedin && !errors.linkedin}
                                            isInvalid={touched.linkedin && errors.linkedin}
                                        />
                                        </InputGroup>
                                        <Form.Text className="form-error">{touched.linkedin && errors.linkedin}</Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="github">
                                        <Form.Label className="onboarding-form-label">Github</Form.Label>
                                        <InputGroup >
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>@</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl 
                                                className="onboarding-form-input"
                                                value={values.github}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                                placeholder="Username"
                                                isValid={touched.github && !errors.github}
                                                isInvalid={touched.github && errors.github}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Row>
                                    <Button 
                                        type="submit"
                                        variant="light-accent" 
                                        className="onboarding-form-btn text-white ml-auto"
                                    >
                                        Next
                                    </Button>
                                </Row>
                            </Form>
                        )}
                    </Formik>
            </div>
        )
    }
}