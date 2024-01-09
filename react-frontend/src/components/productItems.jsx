import React, { useEffect, useState } from 'react';

const ProductItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/products.php')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <img src={product.pictureUrl} alt={product.title} style={{ maxWidth: '250px', marginTop: '175px' }} />
          <h3>{product.title}</h3>
          <p>Price: {product.price}</p>
          <p>Author: {product.author}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductItems;