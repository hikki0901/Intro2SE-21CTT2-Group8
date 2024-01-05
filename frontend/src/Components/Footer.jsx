import React from "react";
import logo from "../image/Logo.png"
import facebook from "../image/Facebook.png"
import youtube from "../image/YouTube.png"
import github from "../image/GitHub.png"
import "../CSS/Footer.css"

function Footer(){
    return (<div class="footer">
    <footer class="py-3 my-4">
        <div class="col-md-12 d-flex align-items-center justify-content-center">
          <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <img src = {logo} alt = "app's logo"/>
          </a>
          <span class="mb-3 mb-md-0 text-body-secondary app-name">Dietarium</span>
        </div>
        <ul class="nav justify-content-center pb-3 mb-3">
            <li class="nav-item"><a href="video" class="nav-link px-2 text-body-secondary">VIDEOS</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">ABOUT</a></li>
            <li class="nav-item"><a href="contact" class="nav-link px-2 text-body-secondary">CONTACT</a></li>
        </ul>
        <ul class="nav col-md-12 justify-content-center list-unstyled d-flex">
            <li class="ms-3"><a class="text-body-secondary" href="https://www.facebook.com/loton.lothon"><img src={facebook}/></a></li>
            <li class="ms-3"><a class="text-body-secondary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src={youtube}/></a></li>
            <li class="ms-3"><a class="text-body-secondary" href="https://github.com/hikki0901/Intro2SE-21CTT2-Group8"><img src={github}/></a></li>
        </ul>

    </footer>
  </div>);
}

export default Footer