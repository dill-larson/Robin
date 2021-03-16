import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";

export default class EducationInputOnboarding extends React.Component {
    validationSchema = yup.object({
        company: yup.string()
            .required("Required"),
        position: yup.string()
            .required("Required"),
        city: yup.string()
            .required("Required"),
        start_date: yup.date()
            .required("Required"),
        end_date: yup.date(),
        rel_achievements: yup.string()
    });

    handleSubmit(values) {
        console.log(values);
    }

    render() {
        return(
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Professional History</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Formik
                    initialValues={{
                        company: '',
                        position: '',
                        city: '',
                        start_date: '',
                        end_date: '',
                        rel_achievements: ''
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
                            <Form.Group controlId="company">
                                <Form.Label className="onboarding-form-label">Company</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="text"
                                    value={values.company}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.company && !errors.company}
                                    isInvalid={touched.company && errors.company}
                                />
                                <Form.Text className="form-error">{touched.company && errors.company}</Form.Text>
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="position">
                                        <Form.Label className="onboarding-form-label">Position</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            value={values.position}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.position && !errors.position}
                                            isInvalid={touched.position && errors.position}
                                        />
                                        <Form.Text className="form-error">{touched.position && errors.position}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="city">
                                        <Form.Label className="onboarding-form-label">City</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            value={values.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.city && !errors.city}
                                            isInvalid={touched.city && errors.city}
                                        />
                                        <Form.Text className="form-error">{touched.city && errors.city}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="start_date">
                                        <Form.Label className="onboarding-form-label">Start Date</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="date"
                                            value={values.start_date}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.start_date && !errors.start_date}
                                            isInvalid={touched.start_date && errors.start_date}
                                        />
                                        <Form.Text className="form-error">{touched.start_date && errors.start_date}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="end_date">
                                        <Form.Label className="onboarding-form-label">End Date</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="date"
                                            value={values.end_date}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.end_date && !errors.end_date}
                                            isInvalid={touched.end_date && errors.end_date}
                                        />
                                        <Form.Text className="form-error">{touched.end_date && errors.end_date}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Group controlId="rel_achievements">
                                <Form.Label className="onboarding-form-label">Relevant Achievements</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="numbers"
                                    value={values.rel_achievements}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.rel_achievements && !errors.rel_achievements}
                                    isInvalid={touched.rel_achievements && errors.rel_achievements}
                                />
                                <Form.Text className="form-error">{touched.rel_achievements && errors.rel_achievements}</Form.Text>
                            </Form.Group>
                            <Row>
                                <Button variant="brand-danger" className="onboarding-form-btn ml-auto">Delete</Button>
                                <Button variant="light-accent text-white" className="onboarding-form-btn ml-2" type="submit">Save</Button>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}