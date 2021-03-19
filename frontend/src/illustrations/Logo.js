import React from 'react';

import illustration from '../svgs/robin_logo.svg';

export default function Logo(props) {
    return(
        <img src={illustration} style={{height: props.size-100, width: props.size}}/>
    );
}