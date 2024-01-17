import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the productId
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (id) => {
    fetch(`http://localhost:80/productDetail.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        // Add watermark to the pictureUrl
        data.pictureUrl = `http://localhost:80/Art/watermarked_${data.pictureUrl}`;
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setProduct(null);
      });
  };



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <p className="title">{product.title}</p>
        <p className="price">Price: {product.price}</p>
        <p className="author">
            Author: {product.author}
            <sup className='copyright'>&copy;</sup>
        </p>
        <img className="product-image" src={product.pictureUrl} alt="Product" />
        <p className="description">{product.description}</p>

    </div>
  );
};

export default ProductDetail;