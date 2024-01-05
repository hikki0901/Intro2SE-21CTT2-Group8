import React from "react";
import logo from "../image/Logo.png"
import facebook from "../image/Facebook.png"
import youtube from "../image/YouTube.png"
import github from "../image/GitHub.png"
import {Link} from 'react-router-dom'
import "../CSS/Footer.css"

function Footer(){
    return (<div class="footer">
    <footer class="py-3 my-4">
        <div class="col-md-12 d-flex align-items-center justify-content-center">
          <Link to="/#" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <img src = {logo} alt="logo image" class="bi me-2" width="40" height="50" role="img"/>
            <span class="text-body-secondary app-name">Dietarium</span>
          </Link>
        </div>
        <ul class="nav justify-content-center pb-3 mb-3">
            <li class="nav-item"><Link to="/video" class="nav-link px-2 text-body-secondary">VIDEOS</Link></li>
            <li class="nav-item"><Link to="#" class="nav-link px-2 text-body-secondary">ABOUT</Link></li>
            <li class="nav-item"><Link to="/contact" class="nav-link px-2 text-body-secondary">CONTACT</Link></li>
        </ul>
        <ul class="nav col-md-12 justify-content-center list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="https://www.facebook.com/loton.lothon" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook"/></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer"><img src={youtube} alt="YouTube"/></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="https://github.com/hikki0901/Intro2SE-21CTT2-Group8" target="_blank" rel="noopener noreferrer"><img src={github} alt="GitHub"/></a></li>
        </ul>

    </footer>
  </div>);
}

export default Footer