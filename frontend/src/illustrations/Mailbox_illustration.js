import React from 'react';
import illustration from '../svgs/mailbox_illustration.svg';

export default function Home_illustration(props) {
    return(
        <img src={illustration} style={{height: props.size, width: props.size}}/>
    );
}