import React from 'react';
import Page from '../Page/Page'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Col, Row } from 'react-bootstrap';
import Illustration from '../illustrations/Mailbox_illustration'
export default class Verify extends React.Component {
    render() {
        return(
            <Page>
                <Header></Header>
                <Row className="verify-email-information">
                    <h1>Email Verification</h1>
                </Row>
                <Row className="verify-email-information">
                   <p>Please check your email for a verification link</p>
                </Row>
                <Row className="verify-email-information">
                    <Illustration size="23rem"></Illustration>
                </Row> 

            
            </Page>
        );
    }
}
