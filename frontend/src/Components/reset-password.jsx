import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from "./Footer";
import "../CSS/Login.css";

function ResetPassWord() {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
    }
  };

  const onSubmit = () =>{
    if (password != ConfirmPassword){
        alert("Your pasword doesn't match")
    }
    else{
        alert("Password is changed successfully")
        navigate("/login")
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
              <p style={{fontSize: '15 px', textAlign: 'center'}}>Enter a new password</p>
              <div className="input-email">
                <input
                  type="password"
                  placeholder="Password"
                  style={{paddingLeft : '20px', border: 'none'}}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>

              <div className="input-email">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  style={{paddingLeft : '20px', border: 'none'}}
                  value={ConfirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                ></input>
              </div>
              
        
              <button className="login-button" type="submit" onClick={onSubmit}>Reset Password</button>

            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassWord;
