import React from 'react';
import { Button, Container, Form, Row, Table,Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import '../Home/Home.scss'
import Results from '../Results/Results'
import './Search.scss'

export default class Search extends React.Component {
    validationSchema = yup.object({
        position: yup.string(),
        skills: yup.string(),
        url: yup.string()
            .url("Invalid URL").required()
            ,
            
    });

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            search: false,
            url:"",
        }
    }

    handleSubmit(value) {
        console.log(value.skills);
        console.log(value.position);
        
       
        this.setState({ 
                search:true,
                url:value.url
            });
    }

    render() {
        if(this.state.search === true){
           return(<Results searchUrl={this.state.url}></Results>)
        }
        return(
            <Container>
                <NavBar/>
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
                            <Form.Group controlId="url">
                                <Form.Label className="search-heddings" style={{color:'#6153ae'}}>Search job by position</Form.Label>
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
                            <Button variant="light-accent text-white" className="search-button" type="submit">Search</Button>
                            {/* <Form.Group controlId="skills">
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
                            </Form.Group> */}
                            {/* <Row style={{justifyContent:"center", marginBottom:"2rem", marginTop:"2rem"}}>
                                <Button variant="light-accent text-white" className="search-button" type="submit">Search</Button>
                            </Row>
                            <Row style={{justifyContent:"center",marginBottom:"2rem", marginTop:"2rem"}}>
                                <h3 className="search-heddings"> -or- </h3><br></br>
                            </Row>
                            <Row style={{justifyContent:"center",marginBottom:"2rem", marginTop:"2rem"}}>
                                <Button  className="search-button" variant="light-accent text-white" type="submit"> Search recommended positions</Button>
                            </Row> */}
                        </Form>
                    )}
                </Formik>
                </div>
                
            </Container>
        );
    }
}
