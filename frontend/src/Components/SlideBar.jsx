import React from 'react';
import logo from "../image/Logo.png"
import barChart from "../image/Bar Chart.png"
import Message from "../image/Chat Message.png"
import homePage from "../image/Home Page.png"
import Journal from "../image/Journal.png"
import onlineSupport from "../image/Online Support.png"
import Reserve from "../image/Reserve.png"
import salesPerformance from "../image/Sales Performance.png"
import '../CSS/slideBar.css';

function SlideBar(){
    return(
    <div class="d-flex flex-column flex-shrink-0 p-3 side" >
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img src={logo} alt="App logo"/>
      <span class="fs-4 bold">DIETARIUM</span>
    </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <p class="bold">
          GENERAL
        </p>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
        <img class="bi pe-none me-2" src={homePage} alt="App logo" width="16" height="16"/>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-body-emphasis">
        <img class="bi pe-none me-2" src={Reserve} alt="App logo" width="16" height="16"/>
          Meal plans
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-body-emphasis">
        <img class="bi pe-none me-2" src={Journal} alt="App logo" width="16" height="16"/>
          Diet diary
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-body-emphasis">
        <img class="bi pe-none me-2" src={barChart} alt="App logo" width="16" height="16"/>
          Analytics
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-body-emphasis">
        <img class="bi pe-none me-2" src={Message} alt="App logo" width="16" height="16"/>
          My chat
        </a>
      </li>
      <p class="bold">
          FEATURES
      </p>
      <li>
        <a href="#" class="nav-link link-body-emphasis">
        <img class="bi pe-none me-2" src={onlineSupport} alt="App logo" width="16" height="16"/>
          Support
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-body-emphasis">
        <img class="bi pe-none me-2" src={salesPerformance} alt="App logo" width="16" height="16"/>
          Membership
        </a>
      </li>
    </ul>
  </div>
  );
}

export default SlideBar