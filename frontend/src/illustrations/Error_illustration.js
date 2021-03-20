import React from 'react';
import illustration from '../svgs/error_illustration.svg';

export default function Error_illustration(props) {
    return(
        <img src={illustration} style={{height: props.size, width: props.size}}/>
    );
}