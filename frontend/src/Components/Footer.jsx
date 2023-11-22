import React from "react";
import logo from "../image/Logo.png"
import facebook from "../image/Facebook.png"
import youtube from "../image/YouTube.png"
import github from "../image/GitHub.png"

function Footer(){

    const footerStyle = {
        position: "absolute",
        backgroundColor: "#D1C6BA",
        height: "220px",
        top: "100%",
        width: "100%"
    }

    const footerLine = {
        display: "flex",
        justifyContent: "center",
        gap: "10px"
    }

    const logoStyle = {
        position: "absolute",
        top: "20px",
        right: "790px",
        width: "22px",
        height: "30.15px"
    }

    const appNameStyle = {
        fontSize: "20px",
        height: "48px",
        top: "0px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "bold"
    }

    const footerTag = {
        fontSize: "20px",
        height: "30px",
        top: "50%",
        fontFamily: "'Poppins', sans-serif",
    }

    return <div style={footerStyle}>
        <div style = {footerLine}>
            <div>
                <img src={logo} alt="AppLogo" style = {logoStyle}/> 
                <p style={appNameStyle}>DIETARIUM</p>
            </div>
            
        </div>
        <div style = {footerLine}>
            <p style={footerTag}>VIDEO</p>
            <p style={footerTag}>ABOUT</p>
            <p style={footerTag}>CONTACT</p>
        </div>
        <div style = {footerLine}>
            <img src={facebook} alt="facebookLogo"/> 
            <img src={youtube} alt="youtubeLogo"/> 
            <img src={github} alt="githubLogo"/> 
        </div>
    </div>
}

export default Footer