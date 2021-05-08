import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import '../Onboarding.scss';

import OnboardingMenu from '../Components/OnboardingMenu';
import Page from '../Page/Page';
import Logo from "../illustrations/Logo";

export default class EducationExtrasOnboarding extends React.Component {
    validationSchema = yup.object({
        honors: yup.string(),
        rel_course_work: yup.string(),
        activities: yup.string()
    });

    handleSubmit(values) {
        console.log(values);
    }

    render() {
        return(
            <Page>
                <Row>
                    <Col md={4}>
                        <OnboardingMenu current="education"/>
                    </Col>
                    <Col>
                        <Row style={{justifyContent:"space-between"}}>
                            <h1 className="onboarding-title">Degree</h1>
                            <Logo size="12rem" ></Logo>
                        </Row>
                        <Formik
                            initialValues={{
                                honors: '',
                                rel_course_work: '',
                                activities: ''
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
                                <Form className="education-form" onSubmit={handleSubmit}>
                                    <Form.Group controlId="honors">
                                        <Form.Label className="onboarding-form-label">Honors</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className="onboarding-form-input"
                                            value={values.honors}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.honors && !errors.honors}
                                            isInvalid={touched.honors && errors.honors}
                                        />
                                        <Form.Text className="form-error">{touched.honors && errors.honors}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="rel_course_work">
                                        <Form.Label className="onboarding-form-label">Relevant Course Work</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className="onboarding-form-input"
                                            value={values.rel_course_work}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.rel_course_work && !errors.rel_course_work}
                                            isInvalid={touched.rel_course_work && errors.rel_course_work}
                                        />
                                        <Form.Text className="form-error">{touched.rel_course_work && errors.rel_course_work}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="activities">
                                        <Form.Label className="onboarding-form-label">Activities</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className="onboarding-form-input"
                                            value={values.activities}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.activities && !errors.activities}
                                            isInvalid={touched.activities && errors.activities}
                                        />
                                        <Form.Text className="form-error">{touched.activities && errors.activities}</Form.Text>
                                    </Form.Group>
                                    <Row>
                                        <Button variant="light-accent text-white" className="onboarding-form-btn ml-auto" type="submit">Save</Button>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Page>
        );
    }
}