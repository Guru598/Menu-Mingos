// src/components/Signup.js
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function SignUp(){
  const [username,setUsername] = useState()
  const [userid, setUserid] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/register', {username,userid,email,password})
    .then(result => {console.log(result)
    navigate('/restaurant')
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2><span>Cafe</span> Mingos</h2>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#info">Info</a></li>
            <li><a href="#help">Help</a></li>
          </ul>
        </nav>
      </header>
      <div className="signup-container">
        <h1><span>Menu</span> Mingos</h1>
        <h2><span>SIGN UP</span></h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="Enter your USN"
              onChange={(e) => setUserid(e.target.value)}
              required
            />

            <label htmlFor="mail">Mail</label>
            <input
              type="email"
              id="mail"
              name="mail"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <span><button type="submit">
           Sign Up
          </button></span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;