import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import '../Onboarding.scss';

import axios from 'axios';
import DateToDBDate from '../Util';

let avg_chars_per_word = 6;
let max_words = 13;
export default class EducationInputOnboarding extends React.Component {
    validationSchema = yup.object({
        school: yup.string()
            .required("Required"),
        degree: yup.string()
            .required("Required"),
        field_of_study: yup.string()
            .required("Required"),
        start_date: yup.date()
            .required("Required"),
        graduation_date: yup.date()
            .min(yup.ref('start_date'), "Date must be later than start date")
            .required("Required"),
        gpa: yup.number()
            .moreThan(0.9 ,"GPA must be higher to equal to 1.0")
            .lessThan(5.1, "GPA must be lower or equal to 5.0")
            .required("Required"),
        honors: yup.string()
            .max(max_words * avg_chars_per_word),
        rel_course_work: yup.string()
            .max(max_words * avg_chars_per_word),
        activities: yup.string()
            .max(max_words * avg_chars_per_word)
    });

    constructor(props) {
        super(props);
        this.state = {
            informationPosted: false
        };
    }

    handleSubmit(values) {
        const degree = {
            email: sessionStorage.getItem('email'),
            school: values.school,
            degree: values.degree, 
            field_of_study: values.field_of_study,
            start_date: DateToDBDate(values.start_date),
            graduation_date: DateToDBDate(values.graduation_date),
            gpa: `${values.gpa}/4.00`,
            honors: values.honors,
            rel_course_work: values.rel_course_work, 
            activities: values.activities
        }
        axios.post('http://127.0.0.1:5000/onboard/education',{degree})
            .then(res => {
                console.log(res.data);
                this.setState({informationPosted: true});
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
            <Formik
                initialValues={{
                    school: '',
                    degree: '',
                    field_of_study: '',
                    start_date: '',
                    graduation_date: '',
                    gpa: '',
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
                    errors
                }) => (
                    <Form className="onboarding-form" onSubmit={handleSubmit}>
                        <h1 className="form-title">Degree</h1>
                        <Form.Group controlId="school">
                            <Form.Label className="form-label">School</Form.Label>
                            <Form.Control
                                className="form-input"
                                type="text"
                                value={values.school}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.school && !errors.school}
                                isInvalid={touched.school && errors.school}
                            />
                            <Form.Text className="form-error-text">{touched.school && errors.school}</Form.Text>
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="degree">
                                    <Form.Label className="form-label">Degree</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="text"
                                        value={values.degree}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.degree && !errors.degree}
                                        isInvalid={touched.degree && errors.degree}
                                    />
                                    <Form.Text className="form-error-text">{touched.degree && errors.degree}</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="field_of_study">
                                    <Form.Label className="form-label">Field of Study</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="text"
                                        value={values.field_of_study}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.field_of_study && !errors.field_of_study}
                                        isInvalid={touched.field_of_study && errors.field_of_study}
                                    />
                                    <Form.Text className="form-error-text">{touched.field_of_study && errors.field_of_study}</Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="start_date">
                                    <Form.Label className="form-label">Start Date</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="date"
                                        value={values.start_date}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.start_date && !errors.start_date}
                                        isInvalid={touched.start_date && errors.start_date}
                                    />
                                    <Form.Text className="form-error-text">{touched.start_date && errors.start_date}</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="graduation_date">
                                    <Form.Label className="form-label">Graduation Date</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="date"
                                        value={values.graduation_date}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.graduation_date && !errors.graduation_date}
                                        isInvalid={touched.graduation_date && errors.graduation_date}
                                    />
                                    <Form.Text className="form-error-text">{touched.graduation_date && errors.graduation_date}</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="gpa">
                                    <Form.Label className="form-label">GPA</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="numbers"
                                        value={values.gpa}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.gpa && !errors.gpa}
                                        isInvalid={touched.gpa && errors.gpa}
                                    />
                                    <Form.Text className="form-error-text">{touched.gpa && errors.gpa}</Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} className="ml-auto" variant="dark-shade" eventKey="0">Extras</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form.Group controlId="honors">
                                            <Form.Label className="form-label">Honors</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                className="form-input"
                                                value={values.honors}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.honors && !errors.honors}
                                                isInvalid={touched.honors && errors.honors}
                                            />
                                            <Form.Text className="form-error-text">{touched.honors && errors.honors}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="rel_course_work">
                                            <Form.Label className="form-label">Relevant Course Work</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                className="form-input"
                                                value={values.rel_course_work}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.rel_course_work && !errors.rel_course_work}
                                                isInvalid={touched.rel_course_work && errors.rel_course_work}
                                            />
                                            <Form.Text className="form-error-text">{touched.rel_course_work && errors.rel_course_work}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="activities">
                                            <Form.Label className="form-label">Activities</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                className="form-input"
                                                value={values.activities}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.activities && !errors.activities}
                                                isInvalid={touched.activities && errors.activities}
                                            />
                                            <Form.Text className="form-error-text">{touched.activities && errors.activities}</Form.Text>
                                        </Form.Group>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <div className="form-footer">
                            <Button variant="light-accent text-white" className="ml-auto" type="submit">Save</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}