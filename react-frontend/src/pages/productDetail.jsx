import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the productId
    fetch(`http://localhost:80/products.php?id=${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display the product details */}
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <p>Author: {product.author}</p>
      {/* Add more product details as needed */}
    </div>
  );
};

export default ProductDetail;