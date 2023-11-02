import React from "react";
import contactus from "../assets/contactus.jpg";
import "../styles/contact.css"; // Import your custom CSS for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-image">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-content">
        <p>
          Need assistance or have a question? Our dedicated team at MGU is here
          to help. Feel free to reach out to us for any inquiries, admissions
          guidance, or to simply connect. Your journey with us starts with a
          conversation—let's begin shaping your academic future together. Visit
          our campus, drop us a line, or connect through social media. We look
          forward to hearing from you.
        </p>
        <div className="contact-details">
          <div>
            <h5>Address:</h5>
            <p>XYZ Street</p>
          </div>
          <div>
            <h5>Phone:</h5>
            <p>123456</p>
          </div>
          <div>
            <h5>Email:</h5>
            <p>abcd@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
