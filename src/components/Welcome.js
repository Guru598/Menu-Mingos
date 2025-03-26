// src/components/Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const Welcome = () => {
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2>Cafe<span>Mingo's</span></h2>
          </div>
          <ul>
            <li><a href="#location">Location</a></li>
            <li><a href="#info">Info</a></li>
            <li><a href="#help">Help</a></li>
          </ul>
        </nav>
      </header>

      <div className="welcome-container">
        <div className="welcome-text">
          <h3>Welcome to</h3>
          <h1>Menu <span>Mingo's</span></h1>
          <p>Your favorite spot for fresh coffee, delicious pastries, and pre-order convenience.</p>
          <div className="buttons">
            <Link to="/login" className="btn">Log In</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 Cafe Mingo's. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Welcome;