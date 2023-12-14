import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import "../CSS/Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("localhost:4000/auth/login", {
                email,
                password,
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return(
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
    );
}

export default Login;