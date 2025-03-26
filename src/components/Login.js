import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import './styles.css';

function Login() {
  const [userid, setUserid] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { setUserId } = useUserContext(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { userid, password })
      .then(result => {
        if (result.data === "Login Successful") {
          setUserId(userid); 
          navigate('/restaurant');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2><span>Cafe</span> Mingos</h2>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#info">Info</a></li>
            <li><a href="#help">Help</a></li>
          </ul>
        </nav>
      </header>
      <div className="login-container">
        <h1><span>Menu</span> Mingos</h1>
        <h2><span>LOGIN</span></h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="Enter your USN"
              onChange={(e) => setUserid(e.target.value)}
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
          <span><button type="submit">Login</button></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
