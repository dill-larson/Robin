import React from 'react';
import Page from '../Page/Page'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Col, Row } from 'react-bootstrap';
import Illustration from '../illustrations/Home_illustration'
export default class Home extends React.Component {
    render() {
        return(
            <Page>
                <Header></Header>
                <Row className="home-information">
                    <p>Find a job <br></br> tailored to your skills <br></br>and the perfect resume <br></br> for that job</p>
                    <Illustration size="27rem"></Illustration>
                </Row>
                <Footer></Footer>
            </Page>
        );
    }
}
