import React from 'react';
import './illustrations.scss';

import illustration from '../svgs/undraw_Accept_request_re_d81h.svg';

export default function Checklist() {
    return(
        <img src={illustration} className="checklist"/>
    );
}