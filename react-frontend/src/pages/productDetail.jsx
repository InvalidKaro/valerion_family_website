import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import detailStyle from '../styles/productDetail.module.css';
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
    <div className={detailStyle.product_detail_container}>
      <div className={detailStyle.product_detail_image}>
      <div className={detailStyle.product_image_container}>
        <img className={detailStyle.product_image} src={product.pictureUrl} alt="Product" />
      </div>
      <div className={detailStyle.product_details}>
        <h1 className={detailStyle.title}>{product.title}</h1>
        <p className={detailStyle.author}>
          By <a href={`/user/${product.author}`} className={detailStyle.author}>{product.author}</a>
        </p>
        <p className={detailStyle.price}>${product.price}</p>
        <p className={detailStyle.description}>{product.description}</p>
        <p className={detailStyle.category}>{product.category}</p>

        <button className={detailStyle.buy_button}>Add to Cart</button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;