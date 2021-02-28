import React from 'react';
import './illustrations.scss';

import illustration from '../svgs/undraw_Accept_request_re_d81h.svg';

export default function Checklist(props) {
    return(
        <img src={illustration} style={{height: props.size, width: props.size}}/>
    );
}