import React from 'react';
import { FaTrash } from "react-icons/fa";
import { useCartContext } from '../context/cart_context';

const CartItem = ({ id, name, category, price, amount }) => {
  const { removeItem } = useCartContext();

 
  return (
    <div className="cart-item-row grid grid-five-column">
      {/* Item Name */}
      <div className="cart-image--name">
        <figure>{name}</figure>
      </div>

      {/* Price */}
      <div className="cart-hide">
        <p>{price}</p>
      </div>

      {/* Quantity Adjustment */}
      <div>
         amount={amount} 
      </div>

      {/* Subtotal */}
      <div className="cart-hide">
        <p>{price * amount}</p>
      </div>

      {/* Remove Button */}
      <div>
        <FaTrash className="remove-icon" cursor="pointer" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
