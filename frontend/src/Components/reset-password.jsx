import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from "./Footer";
import "../CSS/Login.css";
import axios from 'axios';

function ResetPassWord() {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit  = async (event) =>{
    if (password != ConfirmPassword){
        alert("Your pasword doesn't match")
    }
    else if (password ==="" && ConfirmPassword === ""){
        alert("The password can not be blank");
    }
    else{
      var email = window.localStorage.getItem("email");
      try {
        const response = await axios.post("http://localhost:4000/auth/resetpassword", {
            email, password
        });

        if (response.data.success) {
          alert(response.data.message);
          window.localStorage.clear();
          navigate("/login");
        } else {
          alert(response.data.message);
        }
        
      } catch (err) {
        alert(err);
        console.error("Error during request:", err);
      }
    }
  }

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
              <p style={{fontSize: '15 px', textAlign: 'center'}}>Enter a new password</p>
              <div className="input-email">
                <input
                  type="password"
                  placeholder="Password"
                  style={{paddingLeft : '20px'}}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className='input-box'
                ></input>
              </div>

              <div className="input-email">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  style={{paddingLeft : '20px'}}
                  value={ConfirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className='input-box'
                  onKeyPress={handleKeyPress} 
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
