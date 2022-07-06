import React from 'react';

export default function SmallBanner(props) {
    return (
        <img src={props.smallBanner} alt={props.alt} className={props.className} onClick={props.onClick}></img>
    )
}