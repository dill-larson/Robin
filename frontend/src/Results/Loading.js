import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading(props) {
    return (
        <div className="loading-page">
            <div className="loading-box">
                <Spinner animation="grow" variant="main-brand" className="mt-2" />
                <h1 className="ml-2">Gathering Information</h1>
            </div>
        </div>
    );
}