import React, { useState } from 'react';
import axios from 'axios';
import signUpImg from "../image/SignUp.png"
import "../CSS/Signup.css"

function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
      try {
        await axios.post("http://localhost:4000/auth/register", {
          firstName,
          lastName,
          DOB,
          email,
          password,
          confirmPassword,
        });
        alert ("Registration completed");
      } catch (err) {
        console.error("Error during login request:", err);
      }
  };

  return(
      <div class="d-flex justify-content-center">
          <div class="col-md-4 text-center">
            <h1>Sign up</h1>
            <b1>Let's get started with your journey</b1>
            <img src={signUpImg} alt="sign-up-image" />
              </div>
          <div class="col-4 ml-6 modal-content sign-up-form">
            <div class="modal-header-5 p-5 pb-4">
            </div>
            <div class="modal-body p-5 pt-0">
              <form class="">
                <div class="form-floating mb-3">
                  <input 
                  type="text" 
                  class="form-control rounded-3" 
                  id="floatingInput" 
                  placeholder=""
                  onChange={(event) => setfirstName(event.target.value)}
                  />
                  <label for="floatingInput">First Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input 
                  type="text" 
                  class="form-control rounded-3" 
                  id="lastName" 
                  placeholder=""
                  onChange={(event) => setlastName(event.target.value)}
                  />
                  <label for="lastName">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input 
                  type="date" 
                  class="form-control rounded-3" 
                  id="birthDay" 
                  placeholder=""
                  onChange={(event) => setDOB(event.target.value)}
                  />
                  <label for="birthDay">Birth Day</label>
                </div>
                <div class="form-floating mb-3">
                  <input 
                  type="text" 
                  class="form-control rounded-3" 
                  id="phone" 
                  placeholder="phone"
                  onChange={(event) => setPhone(event.target.value)}
                  />
                  <label for="phone">Phone number</label>
                </div>

                <div class="form-floating mb-3">
                  <input 
                  type="email" 
                  class="form-control rounded-3" 
                  id="email" 
                  placeholder="name@example.com"
                  onChange={(event) => setEmail(event.target.value)}
                  />
                  <label for="email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" 
                  class="form-control rounded-3" 
                  id="password" 
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  />
                  <label for="password">Password</label>
                </div>

                <div class="form-floating mb-3">
                  <input 
                  type="password" 
                  class="form-control rounded-3" 
                  id="confirm-password" 
                  placeholder="Password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                  <label for="confirm-password">Confirm Password</label>
                </div>

                <hr/>

                <button onClick= {onSubmit} class="w-120 mb-2 button" type="submit">Sign up</button>
              </form>
            </div>
          </div>
      </div>
        
  );
}

export default Signup;