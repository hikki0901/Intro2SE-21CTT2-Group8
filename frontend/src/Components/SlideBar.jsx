import React, {useState, useEffect} from 'react';
import logo from "../image/Logo.png";
import barChart from "../image/Bar Chart.png";
import Message from "../image/Chat Message.png";
import homePage from "../image/Home Page.png";
import Journal from "../image/Journal.png";
import onlineSupport from "../image/Online Support.png";
import Reserve from "../image/Reserve.png";
import salesPerformance from "../image/Sales Performance.png";
import {NavLink, Link} from 'react-router-dom';
import '../CSS/slideBar.css';
import axios from 'axios';

function PremiumCard(){
  return(<div class="card">
  <div class="card-body">
    <h5 class="card-title">Premium Pakage</h5>
    <p class="card-text">Set sails to a new and better app for your daily use</p>
    <Link to="/membership" class="premium">Upgrade now</Link>
  </div>
</div>);
}

function SlideBar({ userType }){
  const [isPremium, setIsPremium] = useState(false);
  const isDietitian = userType === "dietitian";

  useEffect(() => {
        var email = window.localStorage.getItem("email");
        const type = window.localStorage.getItem("type");
        if (type === "user"){
          const fetchMembership = async () => {
            try {
                const response = await axios.post("http://localhost:4000/auth/viewmembership", {
                email, });
                setIsPremium(response.data.premium)
            } catch (error) {
                console.error("Error fetching premium membership:", error);
                // Handle the error as needed
            }
            };
    
            fetchMembership();
        }
        
    }, []);

    const dietitianLinks = (
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <p class="bold">
            GENERAL
          </p>
        </li>
        <li>
        <li>
        <NavLink to='/dietitian/my-clients-chat' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
          <img class="bi pe-none me-2" src={Message} alt="App logo" width="16" height="16"/>
            My chat
          </NavLink>
        </li>
        <NavLink to='/dietitian/my-clients' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
          <img class="bi pe-none me-2" src={Reserve} alt="App logo" width="16" height="16"/>
            My clients
          </NavLink>
        </li>
        <p class="bold">
            FEATURES
        </p>
        <li>
        <NavLink to='/support' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
          <img class="bi pe-none me-2" src={onlineSupport} alt="App logo" width="16" height="16"/>
            Support
          </NavLink>
        </li>
      </ul>
    );
  
    const userLinks = (
      <div>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <p class="bold">
              GENERAL
            </p>
          </li>
          <li class="nav-item">
            <NavLink to='/home' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={homePage} alt="App logo" width="16" height="16"/>
              Dashboard
            </NavLink>
          </li>
          <li>
          <NavLink to='/meal-plan' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={Reserve} alt="App logo" width="16" height="16"/>
              Meal plans
            </NavLink>
          </li>
          <li>
          <NavLink to='/diet-diary' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={Journal} alt="App logo" width="16" height="16"/>
              Diet diary
            </NavLink>
          </li>
          <li>
          <NavLink to='/analytics' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={barChart} alt="App logo" width="16" height="16"/>
              Analytics
            </NavLink>
          </li>
          <li>
          <NavLink to='/my-chat' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={Message} alt="App logo" width="16" height="16"/>
              My chat
            </NavLink>
          </li>
          <p class="bold">
              FEATURES
          </p>
          <li>
          <NavLink to='/support' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={onlineSupport} alt="App logo" width="16" height="16"/>
              Support
            </NavLink>
          </li>
          <li>
          <NavLink to='/membership' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
            <img class="bi pe-none me-2" src={salesPerformance} alt="App logo" width="16" height="16"/>
              Membership
            </NavLink>
          </li>
        </ul>
        {!isPremium ? (
        <PremiumCard />
        ) : null}
      </div>
    );
  
  return(
  <div class="d-flex flex-column flex-shrink-0 p-3 side" >
  {isDietitian ? dietitianLinks : userLinks}
  </div>
  );
}

export default SlideBar