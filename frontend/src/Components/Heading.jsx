import React from "react";
import logo from "../image/Logo.png"
import {Link} from 'react-router-dom'

function Heading(){

    const headingStyle ={
        height: "60px",
        width: "1165px",
        position: "relative",
        left: "50%",
        top: "40px",
        transform: "translate(-50%, -50%)",
        gap: "10px"
    }

    const headingLine = {
        position: "absolute",
        right: "0%",
        height: "60px",
        display: "flex",
        justifyContent: "flexEnd",
        gap: "20px"
    }

    const appNameStyle = {
        fontSize: "20px",
        position: "absolute",
        left: "25px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "bold"
    }

    const headingTag = {
        fontSize: "20px",
        height: "30px",
        top: "50%",
        fontFamily: "'Poppins', sans-serif",
    }

    const logoStyle = {
        position: "absolute",
        top: "20px",
        width: "22px",
        height: "30.15px"
    }

    return <div className="heading" style={headingStyle}>
        <img src = {logo}  style={logoStyle}/>
        <p style={appNameStyle}>DIETARIUM</p>
        <div style={headingLine}>
            <Link to ='/home'><p style={headingTag}>HOME</p></Link>
            <Link to ='/video'><p style={headingTag}>VIDEO</p></Link>
            <Link to ='/about'><p style={headingTag}>ABOUT</p></Link>
            <Link to ='/contact'><p style={headingTag}>CONTACT</p></Link>
            <Link to ='/login'><p style={headingTag}>LOGIN</p></Link>
            <Link to ='/signup'><p style={headingTag}>SIGNUP</p></Link>
        </div>
    </div>
}

export default Heading