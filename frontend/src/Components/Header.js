import React from 'react';
import { Row } from 'react-bootstrap';
import Logo from '../illustrations/Logo';
import SignupNav from '../Components/SignupNav'

export default function Header(props) {
    return (
        <>
          <Row style={{justifyContent:"space-between"}}>
              <Logo size="12rem"></Logo>
              <SignupNav></SignupNav>
          </Row>
        </>
    );
}