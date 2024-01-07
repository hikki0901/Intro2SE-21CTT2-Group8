import React, { useState, useEffect } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/membership.css"
import DietitianCard from './UserCard';
import axios from 'axios';

const Dietitians = []

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

function addProfiles(dietitian) {
    Dietitians.length = 0;
    // Iterate through names and degrees to create and add profiles
    for (let i = 0; i < dietitian.length; i++) {
      let newDietitian = {
        
        id: i + 1, // Generate a new ID (you can adjust this logic)
        imageLink: require("../image/profile_pic.png"), // You can set a default image link or leave it empty
        name: dietitian[i].firstName + " " + dietitian[i].lastName,
        degree: dietitian[i].degree,
      };
      console.log(newDietitian);
  
      Dietitians.push(newDietitian);
    }

}
function Membership(){
    const [isPremiumMember, setIsPremiumMember] = useState(false);
    const [loading, setLoading] = useState(true);
    const [firstDay, setFirstDay] = useState('');
    const [daysLeft, setDaysLeft] = useState(0);
    const [dietitian, setDietitian] = useState([]);
    
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
        } 
        try {
            const response = await axios.post("http://localhost:4000/dietitian/view");
            setDietitian(response.data.dietitians);
            
            
        } catch (error) {
            console.error("Error fetching dietitian data:", error);
            // Handle the error as needed
        } finally {
            setLoading(false);
        }
        };
        
        fetchMembership();
        
    }, []);

    useEffect(() => {
        addProfiles( dietitian );
    }, [dietitian]);

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
                    {Dietitians.map(createDietitanCard)}
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