import React, { useState } from 'react';
import './CartPopup.css'; // Import CSS file for styling
import Cart from './cartHandler.jsx';

const CartPopup = ({ onClose, cartItems }) => {
  // Logic to fetch cart items from localStorage or state
  const [cart, setCart] = useState(() => {
    // Initialize cart state from localStorage or an empty array
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to clear the local storage cart
  const clearLocalStorageCart = () => {
    localStorage.removeItem("cart");
    setCart([]); // Clear cart state
  };

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        {/* Display cart items */}
        <h2 style={{ background: "none" }}>Cart Items</h2>
        {/* Render cart items here */}
        <Cart cartItems={cart}></Cart>
        {/* PayPal buttons for purchasing */}
        {/* Integrate PayPal buttons here */}
        
        <div className="cart-buttons">
        {/* Clear cart button */}
        <button onClick={clearLocalStorageCart} style={{display: "flex"}}>Clear Cart</button>
        {/* Close button */}
        <button onClick={onClose} style={{display: "flex"}}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
