import React from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default class Home extends React.Component {
    validationSchema = yup.object({
        url: yup.string()
            .url("Invalid URL")
            .required("Required"),
    });
    
    constructor(props) {
        super(props);
        this.state = {
            response: [
                    {
                       "Company":"Apple",
                       "Position":"Software Engineer, Apple Pay",
                       "Location":"",
                       "Link":"https://www.linkedin.com/jobs/view/software-engineer-apple-pay-at-apple-2420590319?refId=ae919a2c-a389-4f43-8c0f-2b9d57f003af&amp;trackingId=gy0uIEWXP%2BUBLcTRecaRtw%3D%3D&amp;position=1&amp;pageNum=0&amp;trk=public_jobs_job-result-card_result-card_full-click",
                       "Time":"2 days ago"
                    }
                ]
            }
    }

    handleSubmit(value) {
        console.log(value);
        axios.get(value)
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
                                <td>{requisition.Position}</td>
                                <td><a href={requisition.Link}>Opportunity at {requisition.Company}</a></td>
                                <td>{requisition.Time}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}