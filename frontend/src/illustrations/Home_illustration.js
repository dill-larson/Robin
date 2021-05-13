import React from 'react';
import illustration from '../svgs/home_illustration.svg';

export default function Home_illustration(props) {
    return(
        <img src={illustration} style={{width: props.size}}/>
    );
}