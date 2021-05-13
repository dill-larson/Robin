import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/* components */
import Page from '../Page/Page';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

/* svgs */
import Illustration from '../illustrations/Home_illustration';

export default class Home extends React.Component {
    render() {
        return(
            <Page>
                <Col>
                    <Row>
                        <Header/>
                    </Row>
                    <Row className="home-information">
                        <p className="home-message">
                            Find a job <br/>
                            tailored to your skills <br/>
                            and the perfect resume <br/>
                            for that job
                        </p>
                        <Illustration size="27rem" />
                    </Row>
                    <Row className="home-information mt-3">
                        <Button as={Link} to="/how-it-works" variant="main-brand" size="lg" >How It Works</Button>
                    </Row>
                    <Row>
                        <Footer/>
                    </Row>
                </Col>
            </Page>
        );
    }
}
