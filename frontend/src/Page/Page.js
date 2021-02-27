import React from 'react';
import { Container } from 'react-bootstrap';

export default function Page(props) {
    return (
        <Container>
            {props.children}
        </Container>
    );
}