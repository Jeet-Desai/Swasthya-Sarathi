import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-page-wrapper">
      <div className="contact-page">
        <h1>CONTACT US</h1>
        <br />
        <p>
          
Have a technical issue or feedback about a beta feature? Let us know!
        </p>
        <form className="contact-form">
          <div className="form-group-contact">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="example@gmail.com" required />
          </div>
          <div className="form-group-contact">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="Let us know how we can help you" required />
          </div>
          <div className="form-group-contact">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" placeholder="Leave a comment..." required></textarea>
          </div>
          <button type="submit" className="submit-btn-contact">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
