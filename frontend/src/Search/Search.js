import React from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import '../Home/Home.scss'

export default class Search extends React.Component {
    validationSchema = yup.object({
        url: yup.string()
            .url("Invalid URL")
            ,
        skills: yup.string()
            
    });

    constructor(props) {
        super(props);
        this.state = {
            response: []
        }
    }

    handleSubmit(value) {
        console.log(value.url);
        console.log(value.skills);
        axios.get('http://127.0.0.1:5000/scrape', {
            params: {
                url: value.url,
                skills: value.skills
            
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
                <NavBar/>
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
                            <h1 className="search-label">Search for a job</h1>
                            <Form.Group controlId="skills">
                                <Form.Label style= {{color: "#6153ae"}}>Search job by specific skills</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="skill1, skill2, skill3"
                                    value={values.skills}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.skills && !errors.skills}
                                    isInvalid={touched.skills && errors.skills}
                                />
                                <Form.Text className="text-danger">{touched.url && errors.url}</Form.Text>
                            </Form.Group>
                            <h3 className="search-label"> -or- </h3>
                            <Form.Group controlId="url">
                                <Form.Label style= {{color: "#6153ae"}}>Search job by specific URL</Form.Label>
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
