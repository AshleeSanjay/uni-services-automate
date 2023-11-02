import React from "react";
import students3 from "../assets/students3.webp";
import "../styles/aboutus.css"; // Import your custom CSS for styling

const About = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">About Us</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p className="lead text-center">
            Welcome to Mahatma Gandhi University, where education meets
            innovation. Our story is one of academic excellence, a dedication to
            shaping bright minds, and a commitment to creating a transformative
            learning environment. Join us on a journey of knowledge, where each
            chapter is marked by a passion for learning, and together, we shape
            the leaders of tomorrow.
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <img src={students3} alt="students3" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  );
};

export default About;
