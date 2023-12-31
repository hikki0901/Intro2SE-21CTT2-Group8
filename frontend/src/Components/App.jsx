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
import ForgetPassWord from "./forgetPassword";
import ResetPassWord from "./reset-password";

const appStyle = {
    margin: "0",
    padding: "0",
    minHeight: "100vh",
    backgroundColor: "#FFF9F2"
}


function App(){

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const handleLogin = () => {
        setUserLoggedIn(true);
    };

     const handleLogout = () => {
        setUserLoggedIn(false);
    };

    return(
        <Router>
            <div style={appStyle}>
                <Heading isLogIn = {userLoggedIn} onLogout={handleLogout} />
                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                    <Route path="/forget-password" element={<ForgetPassWord/>} />
                    <Route path="/reset-password" element={<ResetPassWord/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/meal-plan" element={<MealPlan />} />
                    <Route path="/diet-diary" element={<DietDiary />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/my-chat" element={<Mychat />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/dietitian/my-clients-chat" element={<MyClientsChat />} />
                    <Route path="/dietitian/my-clients" element={<MyClients />} />
                    <Route path="/dietitian/support" element={<Support userType="dietitian" />} />
                    <Route path="/dietitian/meal-plan/:userId" element={<MealPlan userType="dietitian" />} />
                    <Route path="/dietitian/diet-diary/:userId" element={<DietDiary userType="dietitian" />} />
                    <Route path="/dietitian/analytics/:userId" element={<Analytics userType="dietitian" />} />
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