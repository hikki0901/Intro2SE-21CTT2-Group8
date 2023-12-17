import React, { useState } from 'react';
import axios from 'axios';
import Footer from "./Footer";
import '../CSS/Contact.css';

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
          try {
            await axios.post("http://localhost:4000/feedback", {
              name,
              email,
              subject,
              message,
            });
            alert ("message sent");
          } catch (err) {
            console.error("Error during feedback request:", err);
          }
    };
    return(
      <div>
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
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div class="input-email">
                    <input 
                      type="email" 
                      placeholder="Your email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>

                <div class="input-subject">
                  <input 
                    type="text" 
                    placeholder="Subject"
                    onChange={(event) => setSubject(event.target.value)}
                  />
                </div>

                <textarea 
                  placeholder='Your message'
                  onChange={(event) => setMessage(event.target.value)}
                />

                <button onClick= {onSubmit} class="w-120 mb-2 button" type="submit">Send us</button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      </div>
    );
}

export default Contact;