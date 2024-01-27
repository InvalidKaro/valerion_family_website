import React from 'react';
import '../styles/App.css';
import '../styles/shop.css';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
import buttonStyle from '../styles/button.module.css';
import ProductItems from '../components/productItems';

function Shop() {
  const { user } = useUser();


  return (
    <div className="Shop">
        <head>
          <title>Shop</title>
        </head>
      <main className="shop-main">
        <Link to="/upload">
          <button className={buttonStyle.glow_btn} style={{ marginTop: '30px', borderRadius: '25px', width: '400px' }}>Upload your own</button>
        </Link>
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
