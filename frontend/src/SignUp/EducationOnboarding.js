import React from 'react';
import { Button, Col, Form, Row, InputGroup,FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import Nav from "../Components/Nav"
import './Onboarding.scss';

import OnboardingMenu from '../Components/OnboardingMenu'

import Page from '../Page/Page';
import Logo from "../illustrations/Logo"
import Checklist from '../illustrations/Checklist';
import UserPool from '../UserPool';

export default class EducationOnboarding extends React.Component {

    validationSchema = yup.object({
        name: yup.string()
            .required("Required"),
        email: yup.string()
            .email("Invalid email")
            .required("Required"),
        phone: yup.number("No special characters")
            .min(1000000000, "Please input a valid phone number, no special characters")
            .required("Required"),
        website: yup.string().url("Please input a valid url"),
        // tos: yup.bool()
        //     .required("Required")
    });

    constructor(props) {
        super(props);
    }

    handleSubmit(value) {

    }

    render() {
        return (
        <Page>
            <Row>
                <Col md={4}> 
                <OnboardingMenu current="education"></OnboardingMenu>
                </Col>
                <Col>
                    <Row style={{justifyContent:"space-between"}}>
                        <h1 className="onboarding-title">Degrees</h1>
                        <Logo size="12rem" ></Logo>
                    </Row>
                    
                </Col>

            </Row>
           
        </Page>
        )
    }
}