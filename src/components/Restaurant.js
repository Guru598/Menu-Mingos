import React,{ useState } from 'react';
import './styles.css';
import Menu from './MenuApi';
import MenuCard from './MenuCard';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const uniqueList = [
  ...new Set(
  Menu.map((curElem) => {
  return curElem.category;
}))];

  

const Restaurant = () => {
  const [menuData, setMenuData] = useState(Menu);
  const filterItem = (category) => {
    if (category === "all") {
      setMenuData(Menu);
      return;
    }
    
    const updatedList = Menu.filter((curElem) => {
      return curElem.category === category;
    });
    setMenuData(updatedList);
  }
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
     <Navbar filterItem={filterItem} menuList={uniqueList} />
     <MenuCard menuData={menuData} />
    </div>
  );
};

export default Restaurant;
