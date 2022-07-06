import React from "react";
import './Pitymodal.css';

export default function Pitymodal(props) {
    return (
        <div className="modal--background">
            <div className="modal--container">
                <div className="modal--title">
                    <h1>{props.title}</h1>
                </div>
                <hr></hr>
                <div className="modal--body">
                    {props.reward}
                </div>
                <hr></hr>
                <div className="modal--footer">
                    <button className={props.buttonDisabled ? 'confirm--buttonDisabled' : 'confirm--button'} onClick={props.buttonClick} disabled={props.buttonDisabled}>Confirm</button>
                </div>
            </div>
        </div>
    )
}