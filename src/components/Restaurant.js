import React, { useEffect, useState } from 'react';
import './styles.css';
import MenuCard from './MenuCard';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const getUniqueList = (menu) => {
  const categories = menu.map(item => item.category);
  return ['all', ...new Set(categories)];
};

const Restaurant = () => {
  const [menuData, setMenuData] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/menu');
      const data = await response.json();

      const availableItems = data.filter(item => item.available !== false);
      setMenuData(availableItems);
      setMenuList(getUniqueList(availableItems));
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      setError('Unable to fetch menu. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const filterItem = async (category) => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      const data = await response.json();
      const availableItems = data.filter(item => item.available !== false);

      if (category === 'all') {
        setMenuData(availableItems);
      } else {
        const filtered = availableItems.filter(item => item.category === category);
        setMenuData(filtered);
      }
    } catch (err) {
      console.error('Failed to filter menu:', err);
      setError('Unable to filter menu.');
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2>Cafe<span>Mingo's</span></h2>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
      </header>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="loading">Loading menu...</p>
      ) : (
        <>
          <Navbar filterItem={filterItem} menuList={menuList} />
          {menuData.length > 0 ? (
            <MenuCard menuData={menuData} />
          ) : (
            <p>No menu items available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Restaurant;
