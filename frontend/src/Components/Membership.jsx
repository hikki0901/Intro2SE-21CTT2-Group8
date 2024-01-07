import React, { useState, useEffect } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/membership.css"
import DietitianCard from './UserCard';
import axios from 'axios';

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

function getFirstDayOfNextMonth() {
    const today = new Date();
    const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  
    // Format first day as dd/mm/yyyy
    const formattedFirstDay = `${firstDayOfNextMonth.getDate()}/${firstDayOfNextMonth.getMonth() + 1}/${firstDayOfNextMonth.getFullYear()}`;
  
    // Calculate days left
    const daysLeft = Math.floor((firstDayOfNextMonth - today) / (1000 * 60 * 60 * 24));
  
    return { firstDay: formattedFirstDay, daysLeft };
}


function Membership(){
    const [isPremiumMember, setIsPremiumMember] = useState(false);
    const [loading, setLoading] = useState(true);
    const [firstDay, setFirstDay] = useState('');
    const [daysLeft, setDaysLeft] = useState(0);
    
    useEffect(() => {
        var email = window.localStorage.getItem("email");
        const fetchMembership = async () => {
        try {
            const response = await axios.post("http://localhost:4000/auth/viewmembership", {
            email, });
            setIsPremiumMember(response.data.premium)
            const { firstDay, daysLeft } = getFirstDayOfNextMonth();
            setFirstDay(firstDay);
            setDaysLeft(daysLeft);
        } catch (error) {
            console.error("Error fetching premium membership:", error);
            // Handle the error as needed
        } finally {
            setLoading(false); // Set loading to false whether the request is successful or not
        }
        };

        fetchMembership();
    }, []);

    const handleSubscribe = async () => {
        var email = window.localStorage.getItem("email");
        try {
            const response = await axios.post("http://localhost:4000/auth/updatemembership", {
            email, });
            setIsPremiumMember(response.data.premium)
        } catch (error) {
            console.error("Error updating membership:", error);
            // Handle the error as needed
        }
    };

    

    if (loading) {
        // Render loading state or placeholder
        return <p>Loading...</p>;
    }

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
                    <p>Your membership will end in {firstDay}
                    <br></br> <br></br> You have {daysLeft} day(s) left</p>
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