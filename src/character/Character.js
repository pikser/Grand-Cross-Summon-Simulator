import React from 'react';

export default function Character(props) {
    return (
        <img src={props.character} alt={props.alt} className={props.className} onClick={props.pitySelector}></img>
    )
}