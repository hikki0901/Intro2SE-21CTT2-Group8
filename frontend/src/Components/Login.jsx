import React from 'react';
import "../CSS/Login.css"

function Login() {
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
                            <input type="email" placeholder="Enter your Email"></input>
                        </div>

                        <div class="input-password">
                            <input type="password" placeholder="Enter your Password"></input>
                        </div>

                        <button type="submit">Log in</button>

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