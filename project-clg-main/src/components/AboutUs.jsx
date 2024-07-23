// src/components/AboutUs.js
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-page">
      <header className="aboutus-header">
        <h1>About EduMaster</h1>
      </header>
      <div className="aboutus-content">
        <p>
          Welcome to EduMaster, your ultimate solution for managing courses and
          assignments efficiently. Our platform is designed to streamline the
          educational process for both students and educators.
        </p>
        <p>
          At EduMaster, we believe in the power of education and the importance
          of making learning accessible and organized. Our team is dedicated to
          providing the best tools and resources to help you succeed in your
          academic journey.
        </p>
        <p>
          Whether you're an instructor looking to manage your courses or a
          student striving to stay on top of your assignments, EduMaster is here
          to help. Join us today and experience the future of education
          management.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
