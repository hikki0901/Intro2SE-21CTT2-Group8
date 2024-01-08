import React from "react";
import "../CSS/UserCard.css"

function DietitianCard(props){

    const isUser = props.userType === "user";

    return (<div className='' onClick={props.onClick}>
        <div className='dietitian-container'>
            <img src= {props.image_link} ></img>
            {isUser ? 
            <div>
                <div className='dietitian-content'>
                    <h2>{props.name}</h2>
                    <div className="progress-info">
                        <p class="progress-word">Progress</p>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: props.progress}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
            : 
            <div className='dietitian-content'>
                <h2>{props.name}</h2>
                <p>{props.degree}</p>
            </div> }
        </div>
    </div>)
}

export default DietitianCard