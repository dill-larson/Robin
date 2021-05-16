import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import '../Onboarding.scss';
import axios from 'axios';

import DateToDBDate from '../Util';

let avg_chars_per_word = 6;
let max_words = 13;
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
        end_date: yup.date()
            .min(yup.ref('start_date'), "Date must be later than start date"),
        rel_achievements: yup.string()
            .max(max_words * avg_chars_per_word)
    });

    constructor(props) {
        super(props);
        this.state = {
            informationPosted: false
        }
    }

    handleSubmit(values) {
        const position ={
            email: sessionStorage.getItem('email'),
            company: values.company,
            position: values.position,
            start_date: DateToDBDate(values.start_date),
            end_date: DateToDBDate(values.end_date),
            relevant_achievements: values.rel_achievements     
        }
        axios.post('https://ec2-54-193-142-115.us-west-1.compute.amazonaws.com/onboard/experience',{position})
            .then(res => {
                console.log(res.data);
                //this.setState({informationPosted: true});
            })
            .catch(err => {
                console.log(err);
            });
        this.setState({informationPosted: true});
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/experience'/>
        }
        return(
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
                        <h1 className="form-title">Professional History</h1>
                        <Form.Group controlId="company">
                            <Form.Label className="form-label">Company</Form.Label>
                            <Form.Control
                                className="form-input"
                                type="text"
                                value={values.company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.company && !errors.company}
                                isInvalid={touched.company && errors.company}
                            />
                            <Form.Text className="form-error-text">{touched.company && errors.company}</Form.Text>
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="position">
                                    <Form.Label className="form-label">Position</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="text"
                                        value={values.position}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.position && !errors.position}
                                        isInvalid={touched.position && errors.position}
                                    />
                                    <Form.Text className="form-error-text">{touched.position && errors.position}</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="city">
                                    <Form.Label className="form-label">City</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="text"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.city && !errors.city}
                                        isInvalid={touched.city && errors.city}
                                    />
                                    <Form.Text className="form-error-text">{touched.city && errors.city}</Form.Text>
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
                                <Form.Group controlId="end_date">
                                    <Form.Label className="form-label">End Date</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        type="date"
                                        value={values.end_date}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.end_date && !errors.end_date}
                                        isInvalid={touched.end_date && errors.end_date}
                                    />
                                    <Form.Text className="form-error-text">{touched.end_date && errors.end_date}</Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="rel_achievements">
                            <Form.Label className="form-label">Relevant Achievements</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="form-input"
                                value={values.rel_achievements}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.rel_achievements && !errors.rel_achievements}
                                isInvalid={touched.rel_achievements && errors.rel_achievements}
                            />
                            <Form.Text className="form-error-text">{touched.rel_achievements && errors.rel_achievements}</Form.Text>
                        </Form.Group>
                        <div className="form-footer">
                            <Button variant="light-accent text-white" className="ml-auto" type="submit">Save</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}
