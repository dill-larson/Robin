import React from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Nav from "../Components/Nav"

export default class Home extends React.Component {
    validationSchema = yup.object({
        url: yup.string()
            .url("Invalid URL")
            .required("Required"),
    });

    constructor(props) {
        super(props);
        this.state = {
            response: []
        }
    }

    handleSubmit(value) {
        console.log(value.url);
        axios.get('http://127.0.0.1:5000/scrape', {
            params: {
                url: value.url
            }
        })
            .then(res => {
                const response = res.data;
                this.setState({ response });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return(
            <Container>
                <Nav></Nav>
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
                <h6>Response:</h6>
                {/* <p>{JSON.stringify(this.state.response)}</p> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Link</th>
                            <th>Date Posted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.response.map((requisition, index) => {
                            return (<tr>
                                <td>{index+1}</td>
                                <td>{requisition.Company}</td>
                                <td className="text-wrap">{requisition.Position}</td>
                                <td><a href={requisition.Link} target="_blank">Apply at {requisition.Company}</a></td>
                                <td>{requisition.Time}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
