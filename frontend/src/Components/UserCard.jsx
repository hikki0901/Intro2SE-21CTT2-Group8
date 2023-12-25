import React from "react";
import "../CSS/UserCard.css"

function DietitianCard(props){
    return (<div className=''>
        <div className='dietitian-container'>
            <img src= {props.image_link} ></img>
            <div className='dietitian-content'>
                <h2>{props.name}</h2>
                <p>{props.degree}</p>
            </div>
        </div>
    </div>)
}

export default DietitianCard