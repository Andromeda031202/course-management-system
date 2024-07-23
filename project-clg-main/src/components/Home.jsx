// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to EduMaster</h1>
        <p>
          Your ultimate solution for managing courses and assignments
          efficiently.
        </p>
      </header>
      <div className="home-links">
        {/* <Link to="/courses" className="home-link">
          View Courses
        </Link> */}
        {/* <Link to="/assignments" className="home-link">
          View Assignments
        </Link> */}
        {/* <Link to="/profile" className="home-link">
          Profile
        </Link> */}
        <Link to="/signin" className="home-link">
          Log In
        </Link>
        <Link to="/about" className="home-link">
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Home;
