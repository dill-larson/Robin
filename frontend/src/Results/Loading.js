import React, { useState } from 'react';
import {Spinner} from 'react-bootstrap'

export default function Pill(props) {

    return (
        <div className="loading-box">
            <Spinner animation="grow" variant="main-brand" />
             <span style={{ fontSize: "1.7em"}}>
               Gathering Information
            </span>
        </div>
    );
}