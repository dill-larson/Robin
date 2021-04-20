import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Onboarding.scss';

import Logo from "../illustrations/Logo";
import axios from 'axios';

export default class EducationInputOnboarding extends React.Component {
    validationSchema = yup.object({
        school: yup.string()
            .required("Required"),
        degree: yup.string()
            .required("Required"),
        field_of_study: yup.string()
            .required("Required"),
        start_date: yup.string()
            .required("Required"),
        graduation_date: yup.date()
            .required("Required"),
        gpa: yup.number()
            .moreThan(0.9 ,"GPA must be higher to equal to 1.0")
            .lessThan(5.1, "GPA must be lower or equal to 5.0")
            .required("Required")
    });

    constructor(props) {
        super(props);
        this.state = {
            informationPosted: false
        };
    }

    handleSubmit(values) {
        const degree = {
            school: values.school,
            degree: values.degree, 
            field_of_study: values.field_of_study,
            start_date: values.start_date,
            graduation_date: values.graduation_date,
            gpa:values.gpa
        }
        axios.post('http://127.0.0.1:5000/onboard/education',{degree})
            .then(res => {
                console.log(res.data);
                //this.setState({informationPosted: true});
            })
            .catch(err => {
                console.log(err);
            })
        this.setState({informationPosted: true});
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/education'/>
        }
        return(
            <div>
                <Row style={{justifyContent:"space-between"}}>
                    <h1 className="onboarding-title">Degree</h1>
                    <Logo size="12rem" ></Logo>
                </Row>
                <Formik
                    initialValues={{
                        school: '',
                        degree: '',
                        field_of_study: '',
                        start_date: '',
                        graduation_date: '',
                        gpa: ''
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
                            <Form.Group controlId="school">
                                <Form.Label className="onboarding-form-label">School</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="text"
                                    value={values.school}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.school && !errors.school}
                                    isInvalid={touched.school && errors.school}
                                />
                                <Form.Text className="form-error">{touched.school && errors.school}</Form.Text>
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="degree">
                                        <Form.Label className="onboarding-form-label">Degree</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            value={values.degree}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.degree && !errors.degree}
                                            isInvalid={touched.degree && errors.degree}
                                        />
                                        <Form.Text className="form-error">{touched.degree && errors.degree}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="field_of_study">
                                        <Form.Label className="onboarding-form-label">Field of Study</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="text"
                                            value={values.field_of_study}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.field_of_study && !errors.field_of_study}
                                            isInvalid={touched.field_of_study && errors.field_of_study}
                                        />
                                        <Form.Text className="form-error">{touched.field_of_study && errors.field_of_study}</Form.Text>
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
                                    <Form.Group controlId="graduation_date">
                                        <Form.Label className="onboarding-form-label">Graduation Date</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="date"
                                            value={values.graduation_date}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.graduation_date && !errors.graduation_date}
                                            isInvalid={touched.graduation_date && errors.graduation_date}
                                        />
                                        <Form.Text className="form-error">{touched.graduation_date && errors.graduation_date}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="gpa">
                                        <Form.Label className="onboarding-form-label">GPA</Form.Label>
                                        <Form.Control
                                            className="onboarding-form-input"
                                            type="numbers"
                                            value={values.gpa}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.gpa && !errors.gpa}
                                            isInvalid={touched.gpa && errors.gpa}
                                        />
                                        <Form.Text className="form-error">{touched.gpa && errors.gpa}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Row className="mb-2">
                                <Button as={Link} to="/onboarding-education-3"variant="dark-shade" className="onboarding-form-btn ml-auto">Extras</Button>
                            </Row>
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