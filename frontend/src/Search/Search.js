import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import './Search.scss';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import Page from '../Page/Page';
import axios from 'axios';

export default class Search extends React.Component {
    validationSchema = yup.object({
        url: yup.string()
            .required("Required")
            .url("Invalid URL")
    });

    constructor(props) {
        super(props);
        this.state = {
            search: false,
            url:"",
            loggedIn : sessionStorage.getItem('loggedIn'),
            onboarded: false,
            checkOnboarding: false
        }
       
    }

    componentDidMount() {
        const params = {
            email: sessionStorage.getItem('email')
        };

        axios.get(`http://ec2-54-193-142-115.us-west-1.compute.amazonaws.com/fetch/contact`, {params})
          .then(res => {
            const response = res.data;
            
            if(response.email != null) {
                this.setState({ onboarded: true });
            }
            this.setState({ checkOnboarding: true });
          })
    }

    handleSubmit(value) {
        this.setState({ 
            search:true,
            url:value.url
        });
    }

    render() {
        if(this.state.loggedIn === "true"){
            if(this.state.search === true){
                return <Redirect to={`/results/${this.state.url.replaceAll('/', '%2F')}`} />
            }
            if(this.state.checkOnboarding === true && this.state.onboarded === false) {
                return <Redirect to="/onboarding/general"/>
            }
            return(
                <Page>
                    <NavBar/>
                    <div className="search-card">
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
                                <Form className="search-form" onSubmit={handleSubmit}>
                                    <div className="form-header">
                                        <h1 className="form-title">Search for Jobs by URL</h1>
                                    </div>
                                    <Form.Group controlId="url">
                                        <Form.Label className="form-label">LinkedIn URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="URL"
                                            value={values.url}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.url && !errors.url}
                                            isInvalid={touched.url && errors.url}
                                        />
                                        <Form.Text className="form-error-text">{touched.url && errors.url}</Form.Text>
                                    </Form.Group>
                                    <div className="form-footer">
                                        <Button variant="light-accent" className="text-white ml-auto" type="submit">Search</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Page>
            );
        } else {
            return(<Login></Login>)
        }
    }
}
