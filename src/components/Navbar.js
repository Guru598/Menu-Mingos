import React from 'react';

const Navbar = ({ filterItem, menuList }) => {
  return (
    <nav className='navbar'>
      <div className='btn-group'>
        {/* Map through the menuList to render each button */}
        {menuList.map((curElem) => {
          return (
            <button
              className='btn-group__item'
              onClick={() => filterItem(curElem)}
              key={curElem}
            >
              {curElem}
             
            </button>
            
          );
        })}
       
      </div>
    </nav>
  );
};

export default Navbar;
