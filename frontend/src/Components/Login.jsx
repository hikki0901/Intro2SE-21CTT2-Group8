import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import Footer from "./Footer";
import "../CSS/Login.css"

function Login({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Email and password are required");
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:4000/auth/login", {
                email,
                password,
            });

            if (response.data.success) {
                onLogin(response.data.userName);
                
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                window.localStorage.setItem("email", response.data.email);
                navigate("/home");
            } else {
                // Show error message
                alert(response.data.message)
            }
        } catch (err) {
            console.error("Error during login request:", err);
            alert("Error")
        }
    };

    return(
        <div>
        <div class="container">
            <main>
                <div class="login-box">
                    <div class="login-left">
                        <h1>Dietarium</h1>
                        <h2>Your one-stop solution for personalized health tracking and meal planning.</h2>
                    </div>

                    <div class="login-right">
                        <div class="input-email">
                            <input 
                            type="text" 
                            placeholder="Enter your Email"
                            value = {email}
                            onChange={(event) => setEmail(event.target.value)}
                            ></input>
                        </div>

                        <div class="input-password">
                            <input 
                            type="password" 
                            placeholder="Enter your Password"
                            value = {password}
                            onChange={(event) => setPassword(event.target.value)}></input>
                        </div>

                        <button onClick={onSubmit} type="submit" >Log in</button>

                        <a href="#" class="forgot-pass">Forgot password?</a>

                        <hr></hr>

                        <button type="submit">Register</button>
                    </div>
                </div>
            </main>
        </div>
        <Footer/>
        </div>
    );
}

export default Login;