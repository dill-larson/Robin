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
    createResume("clouduser@gmail.com");
}