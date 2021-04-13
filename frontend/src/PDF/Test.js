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
    let data = {
        name: "Dillon Larson",
        phone: "8053909628",
        email: "dillonlouislarson@gmail.com",
        githubUsername: "dill-larson",
        linkedInUsername: "dillon-l-larson",
        educations: [],
        projects: [],
        jobs: []
    }
    e.preventDefault();
    createResume(data);
}