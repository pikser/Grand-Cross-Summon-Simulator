import React from 'react';
import './Banner.css';

export default function Banner(props) {
    return (
        <img src={props.banner} alt='Current Banner' className={props.className}></img>
    )
}