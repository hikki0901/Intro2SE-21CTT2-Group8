import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import "../CSS/Login.css"

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const [successMessage, setSuccessMessage] = useState("");
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  return (
    <div>
      <div className="container">
        <main>
          <div className="login-box">
            <div className="login-left">
              <h1>Dietarium</h1>
              <h2>Your one-stop solution for personalized health tracking and meal planning.</h2>
            </div>

            <div className="login-right">
              <div className="input-email">
                <input
                  type="text"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                ></input>
              </div>

              <div className="input-password">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyPress={handleKeyPress} 
                ></input>
              </div>

              <button onClick={onSubmit} className="login-button" type="submit">Log in</button>

              <a href="#" className="forgot-pass">Forgot password?</a>

              <hr></hr>

              <button type="submit" className="login-button">Register</button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
