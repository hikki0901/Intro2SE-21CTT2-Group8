import React from 'react';
import './style.css';

function Contact() {
    return(
        <div className="contact-us-page">
      <main>
        <h2>Contact Us</h2>

        <form action="/contact" method="post">
          <input type="email" name="email" placeholder="Your email" />
          <textarea name="message" placeholder="Drop us a feedback" />
          <input type="submit" value="Send us" />
        </form>
      </main>
    </div>
    );
}

export default Contact;