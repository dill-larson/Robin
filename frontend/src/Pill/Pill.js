import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';

import './Pill.scss';

export default function Pill(props) {
    const [visible, setVisible] = useState(true);

    function handleClick(e) {
        e.preventDefault();
        setVisible(false);
        removeSkill()
        
    }
    function removeSkill(e) {
        var index = props.array.indexOf(props.name)
        if(index !== -1){
            props.array.splice(index,1);
        }
        
    }

    return visible && (
        <Badge pill variant={props.variant} className="text-white pill">
            {props.name}
            <button type="button" className="close" aria-label="Close" onClick={handleClick}>
                <span aria-hidden="true">&times;</span>
            </button>
        </Badge>
    );
}