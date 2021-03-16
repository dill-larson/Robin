import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Onboarding.scss';

import Logo from "../illustrations/Logo"

export default class SkillsOnboarding extends React.Component {
    validationSchema = yup.object({
        skills: yup.string()
            .required("Required"),
    });
    
    constructor(props) {
        super(props);
    }

    handleSubmit(value) {
        this.props.onUserDataUpdate(value, "skills");
    }

    render() {
        return (
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Skills</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Formik
                    initialValues={{
                        skills: ''
                        
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
                            <Form.Group controlId="skills">
                                <Form.Label className="onboarding-form-label">Skills</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="text"
                                    value={values.skills}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.skills && !errors.skills}
                                    isInvalid={touched.skills && errors.skills}
                                />
                                <Form.Text className="form-error">{touched.skills && errors.skills}</Form.Text>
                            </Form.Group>
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
        );
    }
}