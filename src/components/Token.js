import React, { useEffect, useState } from 'react';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';

const Token = () => {
  const { cart, total_price } = useCartContext();
  const [tokenId, setTokenId] = useState(null);

  useEffect(() => {
    // Generate a 6-digit token ID when the component mounts
    const generateTokenId = () => Math.floor(100000 + Math.random() * 900000);
    setTokenId(generateTokenId());
  }, []);

  return (
    <div>
      <style>
        {`
          /* Wrapper and container styling */
          .wrapper {
            color: black;
            padding: 3rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            width: 80%; /* Reduced width */
            max-width: 600px; /* Smaller maximum width */
            text-align: center;
          }

          .container h1 {
            margin-bottom: 10px;
            font-size: 50px;
            color: #e62e04;
          }

          .container h1 span {
            color: rgb(255, 242, 0);
          }

          .container h2 {
            margin-bottom: 10px;
            font-size: 30px;
            color: #000000;
          }

          /* Table styling */
          .cart-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
          }

          .cart-table th, .cart-table td {
            padding: 1rem;
            border: 1px solid #e0e0e0;
            text-align: left;
          }

          .cart-table th {
            background-color: #f5f5f5;
            font-weight: bold;
          }

          /* Total price styling */
          .order-total--amount {
            margin-top: 2rem;
            display: flex;
            justify-content: center; /* Center the total price */
            align-items: center;
          }

          .order-total--subdata {
            padding: 1rem;
            border: 1px solid #e0e0e0;
            background-color: #fafafa;
            width: 50%; /* Reduced width */
            max-width: 300px; /* Restrict max width */
            text-align: center;
            font-weight: bold;
          }

          .total-price {
            display: flex;
            flex-direction: column;
            align-items: center; /* Center the text inside */
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .container {
              padding: 1rem;
            }
            .order-total--subdata {
              width: 70%; /* Adjust for smaller screens */
            }
          }
        `}
      </style>
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
      <div className="wrapper">
        <div className="container">
          <h1><span>Menu</span> Mingos</h1>
          <h2>Token: {tokenId}</h2> {/* Display the generated token ID */}
          
          {/* Display cart items as a table */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No items in the cart.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Display total price */}
          <div className="order-total--amount">
            <div className="order-total--subdata">
              <div className="total-price">
                <p>Total Price:</p>
                <p>{total_price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
