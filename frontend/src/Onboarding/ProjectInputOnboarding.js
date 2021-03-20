import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Onboarding.scss';
import axios from 'axios';
import Logo from "../illustrations/Logo";

export default class ProjectInputOnboarding extends React.Component {
    validationSchema = yup.object({
        name: yup.string()
            .required("Required"),
        start_date: yup.date()
            .required("Required"),
        end_date: yup.date()
            .required("Required"),
        about: yup.string()
            .required("Required")
    });

    handleSubmit(values) {
        const position ={
            name: values.name,
            position: values.position,
            start_date: values.start_date,
            end_date: values.end_date,
            about: values.about     
        }
        axios.post('http://127.0.0.1:5000/onboard/experience',{
            position}).then(res=>{console.log(res)
            console.log(res.data);})
    }

    render() {
        return(
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Project</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Formik
                    initialValues={{
                        name: '',
                        start_date: '',
                        end_date: '',
                        about: ''
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
                            <Form.Group controlId="name">
                                <Form.Label className="onboarding-form-label">Name</Form.Label>
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
                                        <Form.Label className="onboarding-form-label">Finish Date</Form.Label>
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
                            <Form.Group controlId="about">
                                <Form.Label className="onboarding-form-label">About</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="numbers"
                                    value={values.about}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.about && !errors.about}
                                    isInvalid={touched.about && errors.about}
                                />
                                <Form.Text className="form-error">{touched.about && errors.about}</Form.Text>
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