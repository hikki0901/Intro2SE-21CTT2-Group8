import React from 'react';
import '../CSS/Contact.css';

function Contact() {
    return(
      <div class="container">
        <main>
          <div class="contact-box">
            <div class="contact-left">
              <h1><u>Contact Us</u></h1>
              <h2>Drop us a feedback</h2>
              <p>We’re here to help! If you have any questions, concerns, or feedback, please reach out to us. We’ll get back to you as soon as possible.</p>
            </div>
            <div class="contact-right">
              <form>
                <div class="input-row">
                  <div class="input-name">
                    <input type="text" placeholder="Your name"></input>
                  </div>
                  <div class="input-email">
                    <input type="email" placeholder="Your email"></input>
                  </div>
                </div>

                <div class="input-subject">
                  <input type="text" placeholder="Subject"></input>
                </div>

                <textarea placeholder='Your message'></textarea>

                <button type="submit">Send us</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
}

export default Contact;