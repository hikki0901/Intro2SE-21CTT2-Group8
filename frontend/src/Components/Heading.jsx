import React from "react";
import logo from "../image/Logo.png"
import {Link} from 'react-router-dom'
import "../CSS/Heading.css"

function Heading(props){
    return (
        <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
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

      <div class="col-md-2 text-end row">
        <Link to ='/login' type="button" class="btn me-2 col-5">LOGIN</Link>
        <Link to ='/signup' type="button" class="btn col-5 btn-primary">SIGN UP</Link>
      </div>
    </header>
  </div>
    );
}



export default Heading