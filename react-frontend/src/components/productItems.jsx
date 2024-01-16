import React, { useEffect, useState } from 'react';

const ProductItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/products.php')
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => {
          item.pictureUrl = `http://localhost:80/Art/watermarked_${item.pictureUrl}`;
          return item;
        });
        setProducts(updatedData);
      });
  }, []);

  return (
    <div style={{ marginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {products && products.map(product => (
        <a href={`/product/${product.id}`}>
        <div key={product.id} style={{ marginBottom: '75px' }}>
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              overflow: 'hidden',
            }}
          >
            <img
              src={product.pictureUrl}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                padding: '4px 8px',
                fontSize: '12px',
              }}
            >
            </div>
          </div>
          <h3>{product.title}</h3>
          <p>Price: {product.price}</p>
          <p>Author: {product.author}</p>
        </div>
        </a>
      ))}
    </div>
  );
};

export default ProductItems;