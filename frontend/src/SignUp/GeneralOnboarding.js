import React from 'react';
import { Button, Col, Form, Row, InputGroup,FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import Nav from "../Components/Nav"
import './Onboarding.scss';

import OnboardingMenu from '../Components/OnboardingMenu'

import Page from '../Page/Page';
import Logo from "../illustrations/Logo"
import Checklist from '../illustrations/Checklist';
import UserPool from '../UserPool';

export default class GeneralOnboarding extends React.Component {

    validationSchema = yup.object({
        name: yup.string()
            .required("Required"),
        email: yup.string()
            .email("Invalid email")
            .required("Required"),
        phone: yup.number("No special characters")
            .min(1000000000, "Please input a valid phone number, no special characters")
            .required("Required"),
        website: yup.string().url("Please input a valid url"),
        // tos: yup.bool()
        //     .required("Required")
    });

    constructor(props) {
        super(props);
    }

    handleSubmit(value) {

    }

    render() {
        return (
        <Page>
            <Row>
                <Col md={4}> 
                <OnboardingMenu current="general"></OnboardingMenu>
                </Col>
                <Col>
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
                                <Form className="onboarding-general-form" onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group controlId="name" style={{width:"60%", marginRight: "3rem"}}>
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
                                        <Form.Group controlId="phone" style={{width:"33%"}}>
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
                                
                                    <Form.Group controlId="email">
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
                                    <Form.Group controlId="website">
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
                                    <Row style={{justifyContent:"space-between"}}>
                                        <Form.Group style={{marginLeft:"1rem", width:"45%"}}>
                                            <Form.Label className="onboarding-form-label">LinkedIn</Form.Label>
                                            <InputGroup 
                                            className="onboarding-form-input">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text>@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl 
                                                value={values.linkedin}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                                placeholder="Username" />
                                            </InputGroup>
                                            
                                        </Form.Group>
                                        <Form.Group  style={{marginRight:"1rem", width:"45%"}}>
                                            <Form.Label className="onboarding-form-label">Github</Form.Label>
                                            <InputGroup 
                                            className="onboarding-form-input">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text>@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl 
                                                value={values.github}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                                placeholder="Username" />
                                            </InputGroup>

                                        </Form.Group>
                                
                                        
                                    </Row>
                                    <Row style={{justifyContent:"flex-end"}}>
                                        <Button className="onboarding-submit" type="submit">Next</Button>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                </Col>

            </Row>
           
        </Page>
        )
    }
}