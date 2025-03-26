import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import CartItem from './CartItem';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';

const Orders = () => {
  const { cart, total_price } = useCartContext();
  const { userid } = useUserContext();
  const navigate = useNavigate(); // Initialize navigate

  const handleConfirmOrder = async () => {
    const orderData = {
      userid,
      cartItems: cart.map((item) => ({
        id: item.id,
        name: item.name,
        amount: item.amount,
        price: item.price,
        category: item.category,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Order confirmed successfully");
        // Redirect to Token page after successful order confirmation
        navigate("/Token"); // Use navigate instead of window.location.href
      } else {
        console.error("Failed to confirm order");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
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
          <li><Link to="/restaurant">Menu</Link></li>
          </ul>
        </nav>
      </header>
      <Wrapper>
      <Container>
      <h1><span>Menu</span> Mingos</h1>
      <h2><span>Your Order</span></h2>
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((cur) => (
            <CartItem key={cur.id} {...cur} />
          ))}
        </div>
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div className="total-price">
              <p>Total Price:</p>
              <p>{total_price}</p>
            </div>
            <div className="button-30">
              <button
                style={{
                  width: '150px', // Fixed width for the button
                  color: 'black',
                  backgroundColor: '#ffff00',
                  cursor: 'pointer',
                  padding: '1rem', // Increased padding for a larger button
                  fontSize: '1rem', // Adjust font size if necessary
                  border: 'none', // Remove default border
                  borderRadius: '5px', // Add some border radius
                }}
                onClick={handleConfirmOrder} // Set onClick to trigger order submission and redirection
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  color: black;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Start alignment for the top */
  min-height: 100vh;
  margin-top: 2rem; /* Adds space below the navbar */
`;

const Container = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  margin-top: 2rem; /* Adds additional space between navbar and container */

  h1 {
    margin-bottom: 10px;
    font-size: 50px;
    color: #e62e04;
    text-align: center;
  }

  h1 span {
    margin-bottom: 10px;
    font-size: 50px;
    color: rgb(255, 242, 0);
  }

  h2 {
    margin-bottom: 10px;
    font-size: 30px;
    color: #000000;
    text-align: center;
  }

  .cart_heading,
  .cart-item-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }

  .cart_heading {
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 1rem;
  }

  hr {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid #e0e0e0;
  }

  .cart-item {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
  }

  .order-total--amount {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-total--subdata {
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    background-color: #fafafa;
    width: 100%;
    justify-content: space-between;
    font-weight: bold;
  }

  .total-price {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    .cart_heading,
    .cart-item-row {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }
  }
`;
export default Orders;
