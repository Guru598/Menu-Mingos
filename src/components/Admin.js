import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // needed for <Link>
import './styles.css';
import MenuCard from './MenuCard';
import Navbar from './Navbar';

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load menu items from backend
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to fetch menu items.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Toggle item availability
  const toggleAvailability = async (id) => {
    const item = menuItems.find((it) => it.item_id === id);
    if (!item) return;

    const updatedAvailability = !item.available;

    try {
      await axios.put(`http://localhost:5000/api/menu/${id}`, {
        available: updatedAvailability,
      });

      setMenuItems(
        menuItems.map((it) =>
          it.item_id === id ? { ...it, available: updatedAvailability } : it
        )
      );
    } catch (err) {
      console.error('Error updating availability:', err);
      setError('Failed to update menu item.');
    }
  };

  return (
    <div>
      {/* Header/Navbar Section */}
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2>
              Cafe<span>Mingo's</span>
            </h2>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
      </header>

      {/* Error and Loading */}
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="loading">Loading menu...</p>
      ) : (
        <div style={{ padding: '20px' }}>
          <h2>Admin Panel - Manage Menu Availability</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuItems.map((item) => (
              <li
                key={item.item_id}
                style={{
                  marginBottom: '15px',
                  background: '#f2f2f2',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{item.item_name}</span> — 
                <span
                  style={{ color: item.available ? 'green' : 'red', marginLeft: '8px' }}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
                <button
                  onClick={() => toggleAvailability(item.item_id)}
                  style={{
                    marginLeft: '15px',
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Toggle
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
