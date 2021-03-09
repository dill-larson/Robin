import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';

import './Pill.scss';

export function Pill(props) {
    const [visible, setVisible] = useState(true);

    function handleClick(e) {
        e.preventDefault();
        setVisible(false);
    }

    return visible && (
        <Badge pill variant="dark-accent" className="text-white pill">
            {props.name.toLowerCase()}
            <button type="button" className="close" aria-label="Close" onClick={handleClick}>
                <span aria-hidden="true">&times;</span>
            </button>
        </Badge>
    );
}