import React from 'react';
import { Button, Container, Form, Row, Table,Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Logo from "../illustrations/Logo"
import '../Search/Search.scss'
import { Redirect } from 'react-router';

export default class Search extends React.Component {
    validationSchema = yup.object({
        position: yup.string(),
        skills: yup.string()
            
    });

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            search: false,
        }
    }

    handleSubmit(value) {
        console.log(value.skills);
        console.log(value.position);
        axios.get('http://127.0.0.1:5000/scrape', {
            params: {
                position: value.position,
                skills: value.skills,
                recommended: value.recommended
            
            }
        })
            .then(res => {
                const response = res.data;
                this.setState({ 
                    response,
                    search:true 
                });
            })
            .catch(error => {
                console.error(error);
            });
        //Needs to be removed when connected to backend
        this.setState({ 
                search:true 
            });
    }

    render() {
        if(this.state.search === true){
            return <Redirect to='/results'></Redirect>
        }
        return(
            <Container>
                <Row>
                    <Logo size="12rem"></Logo>
                    <h1 className="search-title">Search for a job</h1>
                </Row>
                <div className="search-card">
                    <Formik
                    initialValues={{
                        skills: '',
                        position: '',
                        recommended: false
    
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
                            <Form.Group controlId="skills">
                                <Form.Label className="search-heddings" style={{color:'#6153ae'}}>Search job by specific skills</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="text"
                                    placeholder="skill1, skill2, skill3"
                                    value={values.skills}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.skills && !errors.skills}
                                    isInvalid={touched.skills && errors.skills}
                                    
                                />
                                <Form.Text className="text-danger">{touched.skills && errors.skills}</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="position">
                                <Form.Label className="search-heddings" style={{color:'#6153ae'}}>Search job by position</Form.Label>
                                <Form.Control
                                    className="onboarding-form-input"
                                    type="text"
                                    placeholder="position"
                                    value={values.position}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.position && !errors.position}
                                    isInvalid={touched.position && errors.position}
                                    
                                />
                                <Form.Text className="text-danger">{touched.position && errors.position}</Form.Text>
                            </Form.Group>
                            <Row style={{justifyContent:"center", marginBottom:"2rem", marginTop:"2rem"}}>
                                <Button variant="light-accent text-white" className="search-button" type="submit">Search</Button>
                            </Row>
                            <Row style={{justifyContent:"center",marginBottom:"2rem", marginTop:"2rem"}}>
                                <h3 className="search-heddings"> -or- </h3><br></br>
                            </Row>
                            <Row style={{justifyContent:"center",marginBottom:"2rem", marginTop:"2rem"}}>
                                <Button  className="search-button" variant="light-accent text-white" type="submit"> Search recommended positions</Button>
                            </Row>
                        </Form>
                    )}
                </Formik>

                </div>
                         
                
            </Container>
        );
    }
}
