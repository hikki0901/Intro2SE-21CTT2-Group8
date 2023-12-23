import React, { useState } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/membership.css"
import profile_pic from '../image/profile_pic.png'

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
                    <div className='suggestion-list'>
                        <div className='dietitian-container'>
                            <img src={profile_pic}></img>
                            <div className='dietitian-content'>
                                <h2>Jessica</h2>
                                <p>Master’s Degree in Public Health Nutrition</p>
                            </div>
                        </div>
                    </div>
                    <div className='suggestion-list'>
                        <div className='dietitian-container'>
                            <img src={profile_pic}></img>
                            <div className='dietitian-content'>
                                <h2>Jasseci</h2>
                                <p>Certified Specialist in Sports Dietetics (CSSD)</p>
                            </div>
                        </div>
                    </div>
                    <div className='suggestion-list'>
                        <div className='dietitian-container'>
                            <img src={profile_pic}></img>
                            <div className='dietitian-content'>
                                <h2>Jisseca</h2>
                                <p>Certified Diabetes Educator (CDE)</p>
                            </div>
                        </div>
                    </div>
                    <div className='suggestion-list'>
                        <div className='dietitian-container'>
                            <img src={profile_pic}></img>
                            <div className='dietitian-content'>
                                <h2>Jassice</h2>
                                <p>Bachelor’s Degree in Dietetics</p>
                            </div>
                        </div>
                    </div>
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