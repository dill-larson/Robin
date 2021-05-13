import React from 'react';

import illustration from '../svgs/checklist_illustration.svg';

export default function Checklist(props) {
    return(
        <img src={illustration} style={{height: props.size, width: props.size}}/>
    );
}