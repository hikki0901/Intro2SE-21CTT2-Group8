import React, { useState } from "react";
import Heading from "./Heading";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from "./About";
import Video from "./Video";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import MealPlan from "./mealPlan";
import DietDiary from "./dietDiary";
import Analytics from "./Analytics";
import Mychat from "./myChat";
import Support from "./Support";
import Membership from "./Membership";
import Settings from "./Settings";
import MyClientsChat from "./MyClientsChat";
import MyClients from "./MyClients";

const appStyle = {
    margin: "0",
    padding: "0",
    minHeight: "100vh",
    backgroundColor: "#FFF9F2"
}


function App(){

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLogin = (name) => {
        setUserLoggedIn(true);
        setUserName(name);
    };

     const handleLogout = () => {
        setUserLoggedIn(false);
            setUserName('');
    };

    return(
        <Router>
            <div style={appStyle}>
                <Heading isLogIn = {userLoggedIn} userName = {userName} onLogout={handleLogout} />
                <Routes>
                    <Route path="/home" element={<Home userName = {userName}/>} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/meal-plan" element={<MealPlan />} />
                    <Route path="/diet-diary" element={<DietDiary />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/my-chat" element={<Mychat />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/my-clients-chat" element={<MyClientsChat />} />
                    <Route path="/my-clients" element={<MyClients />} />
                    <Route
                        path="/"
                        element={<Navigate to="/about" replace />}
                    />
                </Routes>
            </div>
        </Router>   
    );
}

export default App