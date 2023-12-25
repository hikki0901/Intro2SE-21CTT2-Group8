import React, { useState } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/membership.css"
import DietitianCard from './UserCard';

const Dietitian = [{
    id: 1,
    imageLink:require("../image/profile_pic.png"),
    name: "Jessoca",
    degree: "Master’s Degree in Public Health Nutrition"
},{
    id: 2,
    imageLink:require("../image/profile_pic.png"),
    name: "Jessica",
    degree: "Certified Specialist in Sports Dietetics (CSSD)"
},{
    id: 3,
    imageLink:require("../image/profile_pic.png"),
    name: "Jessuca",
    degree: "Certified Diabetes Educator (CDE)"
},{
    id: 4,
    imageLink:require("../image/profile_pic.png"),
    name: "Jessaca",
    degree: "Bachelor’s Degree in Dietetics"
},
]

function createDietitanCard(dietitianItem){
    return(
        <DietitianCard
            key={dietitianItem.id}
            name={dietitianItem.name}
            image_link={dietitianItem.imageLink}
            degree={dietitianItem.degree}
        />
    );
}


function Membership(){

    const [isPremiumMember, setIsPremiumMember] = useState(false);

    const handleSubscribe = () => {
      setIsPremiumMember(true);
    };

    return(
        <div class="row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-10">
            {isPremiumMember ?
            <div className='premium-container'>
                <div className='suggestion'>
                    <h1>Dietitian suggestions</h1>
                    {Dietitian.map(createDietitanCard)}
                </div>
                <div className='status'>
                    <h1>Membership status</h1>
                    <p>Your membership will end in 10/10/2023
                    <br></br> <br></br> You have 100 days left</p>
                </div>
            </div> : 
            <div class='membership-container'>
                <h1>Join our premium course today!</h1>
                <p>
                🍏 Get a dedicated dietitian to craft a personalized plan tailored just for you. <br></br>
                💬 Chat directly with your chosen dietitian whenever you need. <br></br>
                🔄 Not vibing with your current dietitian? No worries! Switch to a new one hassle-free.
                </p>
                <div className='membership-content'>
                    <div className='sub-content'>
                        <h2>Starter</h2>
                        <p>Free</p>
                        <ul>
                            <li>Access to our diet planner</li>
                            <li>Customize your own plan</li>
                            <li>Record and track your diet</li>
                            <li>BMI and calories calculator</li>
                            <li>Monthly diet analytics</li>
                        </ul>
                    </div>
                    <div className='line'></div>
                    <div className='sub-content'>
                        <h2>Premium</h2>
                        <p>$9.99/mo</p>
                        <ul>
                            <li>Features in starter course</li>
                            <li>Access to our roster of professional dietitians</li>
                            <li>Freely change dietitian to suit your style</li>
                            <li>Contact with your dietitian via message or video call</li>
                        </ul>
                    </div>                
                </div>
                <button onClick={handleSubscribe} >Join now!</button>
            </div> }
        </div>
    </div>
    );
}

export default Membership