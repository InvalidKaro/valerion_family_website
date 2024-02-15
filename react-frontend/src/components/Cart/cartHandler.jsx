// Cart.jsx
import React from "react";

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2 className="cart-title">Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <div>
              <img
                src={item.pictureUrl}
                alt={item.title}
                className="cart-item-image"
              />
              <span className="cart-item-details">
                {item.title} - ${item.price}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
