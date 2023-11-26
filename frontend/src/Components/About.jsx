import React from 'react';
import "../CSS/about.css"

import intro from '../image/pic1.png'
import serve from '../image/pic2.png'
import join from '../image/pic3.png'
import profile_pic from '../image/profile_pic.png'

import Profile from '../Components/Profile'

function About() {
    return(
        <div className='about-us' id='aboutus'>
           <div className='about-us__container'>
            <div className='about-us__heading'>
                <h1>About us</h1>
                <div />
            </div>
            <div className='about-us__content'>
                <div className='about-us__section-content'>
                    <h2>Introduction</h2>
                    <p>Welcome to Dietarium, your comprehensive web-based nutrition and diet-tracking application. We believe in the power of quality food and nutritional knowledge in shaping our lives. In a world where health information is readily available, we’ve created Dietarium to make this knowledge easily accessible and actionable. Our goal is to help you lead a healthier life without the constant need for medical intervention.</p>
                </div>
                <div className='about-us__image'>
                    <img src={intro} alt='intro' />
                </div>
                <div className='about-us__image'>
                    <img src={serve} alt='serve' />
                </div>
                <div className='about-us__section-content' id='serve'>
                    <h2>Who we serve</h2>
                    <p>Dietarium is designed for everyone, with a special focus on individuals who are facing challenges related to diet.</p>
                </div>
                <div className='about-us__section-content'>
                    <h2>Our platform</h2>
                    <p>Our platform offers a range of features:</p>
                    <ul>
                        <li><span>BMI Check</span>: Enter your gender, weight, and height to calculate your Body Mass Index (BMI).</li>
                        <li><span>Personalized Plans</span>: Based on your BMI, we suggest an appropriate diet plan.</li>
                        <li><span>Reminders</span>: Receive notifications about meal times and fasting periods.</li>
                    </ul>
                </div>
                <div className='about-us__section-content' id='second-list'>
                    <ul>
                        <li><span>Meal Customization</span>: Create new meals, modify existing ones, or delete meals as per your preference.</li>
                        <li><span>Calorie Calculation</span>: The app calculates the total calories of your planned meals for the day.</li>
                        <li><span>Diet Diary</span>: Receive end-of-day feedback based on your plan and record your thoughts in your personal diet diary.</li>
                    </ul>
                </div>
                <div className='about-us__section-content'>
                    <h2>Join us</h2>
                    <p>We invite you to join us on this journey towards better health. Sign up today and start taking control of your health and wellness with Dietarium.</p>
                </div>
                <div className='about-us__image'>
                    <img src={join} alt='join' />
                </div>
            </div>
            <div className='our-team__container'>
                <div className='our-team__heading'>
                    <h1>Our team</h1>
                    <div />
                </div>
                <div className='our-team__content'>
                    <Profile src={profile_pic} name='Jessica Page' role='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
                    <Profile src={profile_pic} name='Jessica Page' role='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
                    <Profile src={profile_pic} name='Jessica Page' role='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
                    <Profile src={profile_pic} name='Jessica Page' role='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
                    <Profile src={profile_pic} name='Jessica Page' role='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
                </div>
            </div>
           </div>
        </div>
    );
}

export default About;