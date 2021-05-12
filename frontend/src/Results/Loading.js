import React from 'react';
import { Spinner } from 'react-bootstrap';

import Page from '../Page/Page';

export default function Pill(props) {

    return (
        <div className="loading-page">
            <div className="loading-box">
                <Spinner animation="grow" variant="main-brand" className="mt-2" />
                <h1 className="ml-2">Gathering Information</h1>
            </div>
        </div>
    );
}