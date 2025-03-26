import React, { useState } from 'react';
import CartAmountToggle from './CartAmountToggle';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';

const AddtoCart = ({ curElem }) => {
    const{addToCart}=useCartContext();
  const { item_id, price } = curElem;
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    setAmount(amount > 1 ? amount - 1 : 1);
  };

  const setIncrease = () => {
    setAmount(amount + 1);
  };

  return (
    <>
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <NavLink to="/Orders">
        <button
          className="button"
          onClick={() => addToCart(item_id, amount, curElem)}
        >
          Order
        </button>
      </NavLink>
    </>
  );
};

export default AddtoCart;
