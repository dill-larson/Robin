import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

export default class Home extends React.Component {
    validationSchema = yup.object({
        url: yup.string()
            .url("Invalid URL")
            .required("Required"),
    });
    
    constructor(props) {
        super(props);
    }

    handleSubmit(value) {
        console.log(value);
    }

    render() {
        return(
            <Container>
                <Formik
                    initialValues={{
                        url: ''
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="url">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="URL"
                                    value={values.url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.url && !errors.url}
                                    isInvalid={touched.url && errors.url}
                                />
                                <Form.Text className="text-danger">{touched.url && errors.url}</Form.Text>
                            </Form.Group>
                            <Button variant="main-brand" type="submit">Retrieve Data</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        );
    }
}