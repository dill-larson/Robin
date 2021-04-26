import React from 'react';
import { Button } from 'react-bootstrap';
import Page from '../Page/Page';
import createResume from '../PDF/PDF';

export default function Test() {    
    return(
        <Page>
            <Button onClick={handleClick}>Create PDF</Button>
        </Page>
    );
}

function handleClick(e) {
    e.preventDefault();
    createResume("clouduser@gmail.com", "Strong hands-on experience with Java Experience with MongoDB, Kafka Problem solving skills %26 technical troubleshooting Experience with testing frameworks, continuous integration and build tools");
}