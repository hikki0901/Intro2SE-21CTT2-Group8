import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from "./Footer";
import "../CSS/Login.css";

function ForgetPassWord() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
    }
  };

  const onSubmit = () =>{
    if (!validEmail){
        alert("Your email doesn't exist")
    }
    else{
        navigate("/reset-password")
    }
  }
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
                  style={{paddingLeft : '20px', border: 'none'}}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
