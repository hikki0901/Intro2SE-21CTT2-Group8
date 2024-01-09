import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from "./Footer";
import "../CSS/Login.css";
import axios from 'axios';

function ForgetPassWord() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
      console.log(email);
      if (!email) {
        alert("Please enter an email");
      } 

      try {
        const response = await axios.post("http://localhost:4000/auth/password", {
            email
        });

        if (response.data.success) {
          window.localStorage.setItem("email", email);
          navigate("/reset-password");
        } else {
          alert(response.data.message);
        }
        
      } catch (err) {
        alert(err);
        console.error("Error during request:", err);
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
              <p style={{fontSize: '15 px', textAlign: 'center'}}>Enter the email address asscociate with your account</p>
              <div className="input-email">
                <input
                  type="text"
                  placeholder="Enter your Email"
                  style={{paddingLeft : '20px'}}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className='input-box'
                  onKeyPress={handleKeyPress} 
                ></input>
              </div>

        
              <button className="login-button" type="submit" onClick={onSubmit}>Continue</button>

            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ForgetPassWord;
