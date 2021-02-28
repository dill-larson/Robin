import React from 'react';

import illustration from './login_illustration.svg';

export default function Logo(props) {
    return(
        <img src={illustration} style={{height: props.size, width: props.size}}/>
    );
}