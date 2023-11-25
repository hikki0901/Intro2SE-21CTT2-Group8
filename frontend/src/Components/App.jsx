import React from "react";
import Heading from "./Heading";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Video from "./Video";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

const appStyle = {
    margin: "0",
    padding: "0",
    height: "100vh",
    backgroundColor: "#FFF9F2"
}

function App(){
    return(
        <Router>
            <div style={appStyle}>
                <Heading/>
                <Footer />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>   
    );
}

export default App