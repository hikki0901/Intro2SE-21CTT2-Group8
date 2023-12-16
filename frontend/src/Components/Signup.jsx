import React from 'react';
import signUpImg from "../image/SignUp.png"
import "../CSS/Signup.css"

function Signup() {
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
                  <input type="text" class="form-control rounded-3" id="floatingInput" placeholder=""/>
                  <label for="floatingInput">First Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-3" id="lastName" placeholder=""/>
                  <label for="lastName">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-3" id="birthDay" placeholder=""/>
                  <label for="birthDay">Birth Day</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-3" id="email" placeholder="name@example.com"/>
                  <label for="email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control rounded-3" id="password" placeholder="Password"/>
                  <label for="password">Password</label>
                </div>

                <div class="form-floating mb-3">
                  <input type="password" class="form-control rounded-3" id="confirm-password" placeholder="Password"/>
                  <label for="confirm-password">Confirm Password</label>
                </div>

                <hr/>

                <button class="w-120 mb-2 button" type="submit">Sign up</button>
              </form>
            </div>
          </div>
      </div>
        
    );
}

export default Signup;