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
export default class ProjectInputOnboarding extends React.Component {
    validationSchema = yup.object({
        name: yup.string()
            .required("Required"),
        start_date: yup.date()
            .required("Required"),
        end_date: yup.date()
            .min(yup.ref('start_date'), "Date must be later than start date")
            .required("Required"),
        about: yup.string()
            .required("Required")
            .max(max_words * avg_chars_per_word)
    });

    constructor(props) {
        super(props);
        this.state = {
            informationPosted: false
        };
    }

    handleSubmit(values) {
        const position ={
            email: sessionStorage.getItem('email'),
            name: values.name,
            position: values.position,
            start_date: DateToDBDate(values.start_date),
            end_date: DateToDBDate(values.end_date),
            about: values.about        
        }
        axios.post('http://ec2-54-193-142-115.us-west-1.compute.amazonaws.com/onboard/project',{position})
            .then(res => {
                console.log('in project input onboarding');
                console.log(res.data);
                // this.setState({informationPosted: true});
            })
            .catch(err => {
                console.log(err);
            })
        this.setState({informationPosted: true});
    }

    render() {
        if(this.state.informationPosted){
            return <Redirect to='/onboarding/projects'/>
        }
        return(
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
                        <h1 className="form-title">Project</h1>
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
                                    <Form.Label className="form-label">Finish Date</Form.Label>
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
                        <Form.Group controlId="about">
                            <Form.Label className="form-label">About</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="form-input"
                                value={values.about}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.about && !errors.about}
                                isInvalid={touched.about && errors.about}
                            />
                            <Form.Text className="form-error-text">{touched.about && errors.about}</Form.Text>
                        </Form.Group>
                        <div className="form-footer">
                            <Button variant="light-accent" className="text-white ml-auto" type="submit">Save</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}
