import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
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

  // PayPal client ID
  const clientId = "your_client_id";

  // Function to create an order
  const createOrder = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: cart.reduce((total, item) => total + item.price * item.quantity, 0),
          },
        },
      ],
    });
  };

  // Function to onApprove
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // Clear the local storage cart
      clearLocalStorageCart();
      // Show a success message
      alert("Transaction completed!");
    });
  };

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        {/* Display cart items */}
        <h2 style={{ background: "none" }}>Cart Items</h2>
        {/* Render cart items here */}

        {/* Make this be buyout page */}
        <div>
        <Cart cartItems={cart}/>
        {/* PayPal buttons for purchasing */}
        <PayPalScriptProvider options={{ "client-id":                         "AcDIoMXbZyUPOjPOXmCoWScT-8jv6ejhq-w554g5vg6zsZ3tdCpYz6o7htsH-AOH4ZygmVvPu0Ry7rA5"}}>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
        </div>
        {/* Clear cart button */}
        <button onClick={clearLocalStorageCart} style={{display: "flex"}}>Clear Cart</button>
        {/* Close button */}
        <button onClick={onClose} style={{display: "flex"}}>Close</button>
      </div>
    </div>
  );
};

export default CartPopup;