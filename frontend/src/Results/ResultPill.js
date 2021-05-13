import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';

export default function Pill(props) {

    return (
        <h5 style={{ padding:"0.3rem" ,fontWeight:"lighter"}}><Badge pill variant={props.variant} className="text-white">
            {props.name}
        </Badge></h5>
    );
}