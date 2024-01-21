import React, { useEffect, useState } from 'react';

const ProductItems = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  const groupProductsByCategory = (products) => {
    const groupedProducts = {};
    products.forEach((product) => {
      const category = product.category || 'No category';
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(product);
    });
    return groupedProducts;
  };

  useEffect(() => {
    fetch('http://localhost:80/products.php')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const updatedData = data.map((item) => {
            item.pictureUrl = `http://localhost:80/Art/watermarked_${item.pictureUrl}`;
            return item;
          });
          const groupedData = groupProductsByCategory(updatedData);
          setGroupedProducts(groupedData);
        } else {
          const product = data;
          product.pictureUrl = `http://localhost:80/Art/watermarked_${product.pictureUrl}`;
          const groupedData = groupProductsByCategory([product]);
          setGroupedProducts(groupedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ... (previous code remains unchanged)

return (
  <div style={{ marginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {Object.entries(groupedProducts).map(([category, products]) => (
      <div key={category} style={{ marginBottom: '75px' }}>
        <h2>{category}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            
              <div style={{  marginBottom: '75px', marginRight: '20px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '200px',
                    height: '200px',
                    overflow: 'hidden',
                  }}
                >
                  <a key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={product.pictureUrl}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '35px',
                    }}
                  />
                  </a>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      padding: '4px 8px',
                      fontSize: '12px',
                    }}
                  >
                    {/* Additional content for the overlay */}
                  </div>
                </div>
                <h3>{product.title}</h3>
                <p>Price: {product.price}</p>
                <a href={`/user/${product.author}`} className='author-link' style={{ textDecoration: 'underline', color: 'inherit' }}>
                  Author: {product.author}
                </a>              
              </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
};

export default ProductItems;