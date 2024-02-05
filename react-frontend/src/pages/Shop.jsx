import React from 'react';
import { useUser } from '../UserContext';
import ProductItems from '../components/productItems';
import { useAuth } from "../pages/auth";
import '../styles/App.css';
import buttonStyle from '../styles/button.module.css';
import '../styles/shop.css';

function Shop() {
  const { user } = useUser();
  const { navigate } = useAuth();


  const uploadButtonClick = (e) => {
    console.log("Buy button clicked");
    e.preventDefault();

    // Add logic to handle the buy button click, e.g., redirect to the purchase page
    navigate("/upload");
  };

  return (
    <div className="Shop">
        <head>
          <title>Shop</title>
        </head>
      <main className="shop-main">
          <button onClick={uploadButtonClick} className={buttonStyle.glow_btn} style={{ borderRadius: '25px', width: '30vh', marginInline: 'auto', display:'block' }}>Upload your own</button>
        <ProductItems></ProductItems>
        {user && user.username ? ( // Check if user and username exist
          <div>
            <h1>Welcome, {user.username}!</h1>
            {/* Add more user information if needed */}
       
          </div>
          
        ) : (
          <div>
            <h1>Welcome!</h1>
          </div>
        )}

      </main>
    </div>
  );
}

export default Shop;
