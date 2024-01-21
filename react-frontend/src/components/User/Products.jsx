import React, { useState, useEffect } from 'react';
import '../../styles/userinfo.css';

const UserProducts = () => {
  const [userx, setUserx] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = 'Karo';
        const response = await fetch(`http://localhost:80/userInventory.php?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();

        setUserx(data);
        console.log('ProductInventory:', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='product_section'>
    <h2>User Inventory</h2>
    <div className='product-container'>
      {userx.map((product, index) => (
        <a key={index} href={`/product/${product.id}`} className='product-box'>
          <p>Title: {product.title}</p>
          <img src={`http://localhost:80/Art/watermarked_${product.picture_url}`} alt={product.title} className='product-image' />
        </a>
      ))}
    </div>
  </div>
  );
}

export default UserProducts;