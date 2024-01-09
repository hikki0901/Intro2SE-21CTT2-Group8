import React from "react";
import logo from "../image/Logo.png"
import notification from "../image/Notification.png"
import userImage from "../image/user_image.png"
import expandArrow from "../image/Expand Arrow.png"
import {Link, useNavigate} from 'react-router-dom'
import "../CSS/Heading.css"


const notificationData = [
  { id: 1, message: 'Hello, See your meals plan for today' },
  { id: 2, message: 'Check your analytics for this month' },
  { id: 3, message: 'Your dietitian made a new suggestion for today' },
];


function Heading(props){
    const type = window.localStorage.getItem("type");
    const login = window.localStorage.getItem("isLogin");
    const name = window.localStorage.getItem("username");
    const navigate = useNavigate();
    const onSubmit = () => {
      props.onLogout();
      window.localStorage.clear();
      navigate("/login");
    };

    return (
        <div class="container">
          <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 ml-0 border-bottom">
            <div class="col-md-3 mb-2 mb-md-0">
              <Link to="/about" id="logo" class="link-body-emphasis text-decoration-none">
                <img src={logo} alt="logo image" class="bi me-2" width="22" height="32" role="img"/>
                <span class="app-name">Dietarium</span>
              </Link>
            </div>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              {(props.isLogIn === true || login == 1) &&  (<li><Link to={type === "user" ? '/home' : '/dietitian/my-clients'} className="nav-link px-2">HOME</Link></li>)}
              <li><Link to ='/video' class="nav-link px-2">VIDEOS</Link></li>
              <li><Link to ='/about' class="nav-link px-2">ABOUT</Link></li>
              <li><Link to ='/contact' class="nav-link px-2">CONTACT</Link></li>
            </ul>

            {(props.isLogIn === false && login != 1) && (<div class="col-md-2 text-end row">
              <Link to ='/login' type="button" class="btn me-2 col-5" id="loggin">LOGIN</Link>
              <Link to ='/signup' type="button" class="btn col-5" id = "signup">SIGN UP</Link>
            </div>)}

      {(props.isLogIn === true || login == 1) && (<div class="verticalLine col-md-3 row">
        <div class="col expand">
          <input id='noti-tog' className="dropdown-toggle" type="image" src={notification}/>
          <div id='noti-dc' className="dropdown-content">
            <h4>Notification</h4>
            <div className="noti-list">
              {notificationData.map(noti => (
                <div key={noti.id} className="noti-content">
                  <p>{noti.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <input class="col user-image" type="image" src={userImage}></input>
        <p class="col username">{name}</p>
        <div class="col expand">
          <input className="dropdown-toggle" type="image" src={expandArrow}/>
          <div className="dropdown-content">
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={onSubmit} >Logout</button>
          </div>
        </div>
      </div>)}
    </header>
  </div>
    );
}


export default Heading