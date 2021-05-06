import React from 'react';
import { Col, Row } from 'react-bootstrap';

/* components */
import Page from '../Page/Page'
import Header from '../Components/Header';
import Footer from '../Components/Footer';

/* svgs */
import Illustration from '../illustrations/Mailbox_illustration'
export default class Verify extends React.Component {
    render() {
        return(
            <Page>
                <Header/>
                <Col className="verify-email-information text-center">
                    <h1>Email Verification</h1>
                    <h5 className="text-light-accent">Please check your email for a verification link</h5>
                    <Row style={{justifyContent: "center"}}>
                        <Illustration size="23rem"></Illustration>
                    </Row>
                </Col>
                <Footer/>
            </Page>
        );
    }
}
