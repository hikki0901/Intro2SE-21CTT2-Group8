import React from "react";
import logo from "../image/Logo.png"
import notification from "../image/Notification.png"
import userImage from "../image/user_image.png"
import expandArrow from "../image/Expand Arrow.png"
import {Link, useNavigate} from 'react-router-dom'
import "../CSS/Heading.css"

function Heading(props){
    const navigate = useNavigate();
    const onSubmit = () => {
      props.onLogout();
      window.localStorage.removeItem("userID")
      navigate("/login");
    };

    return (
        <div class="container">
          <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 ml-0 border-bottom">
            <div class="col-md-3 mb-2 mb-md-0">
              <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                <img src={logo} alt="logo image" class="bi me-2" width="40" height="32" role="img"/>
                <span class="fs-4 app-name">DIETARIUM</span>
              </a>
            </div>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              {props.isLogIn === true && (<li><Link to ='/home' class="nav-link px-2">HOME</Link></li>)}
              <li><Link to ='/video' class="nav-link px-2">VIDEOS</Link></li>
              <li><Link to ='/about' class="nav-link px-2">ABOUT</Link></li>
              <li><Link to ='/contact' class="nav-link px-2">CONTACT</Link></li>
            </ul>

            {props.isLogIn === false && (<div class="col-md-2 text-end row">
              <Link to ='/login' type="button" class="btn me-2 col-5" id="loggin">LOGIN</Link>
              <Link to ='/signup' type="button" class="btn col-5" id = "signup">SIGN UP</Link>
            </div>)}

      {props.isLogIn === true && (<div class="verticalLine col-md-3 row">
        <input class="col notification" type="image" src={notification} />
        <input class="col user-image" type="image" src={userImage}></input>
        <p class="col username">{props.userName}</p>
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