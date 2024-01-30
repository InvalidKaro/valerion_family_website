import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import detailStyle from "../styles/productDetail.module.css";
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the productId
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (id) => {
    fetch(`http://localhost:80/productDetail.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Add watermark to the pictureUrl
        data.pictureUrl = `http://localhost:80/Art/watermarked_${data.pictureUrl}`;
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setProduct(null);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={detailStyle.product_detail_container}>
      <img
        className={detailStyle.product_image}
        src={product.pictureUrl}
        alt="Product"
      />
      <div className={detailStyle.product_container}>
        <div className={detailStyle.product_details}>
          <div classname={detailStyle.box}>
            <h1 className={detailStyle.title}>{product.title}</h1>
            <p className={detailStyle.price}>${product.price}</p>
            <div
              style={{
                width: "20%",
                borderBottom: "3px solid white",
                marginInline: "20px",
                marginTop: "20px",
              }}
            ></div>
            <p className={detailStyle.author}>
              <a
                href={`/user/${product.author}`}
                className={detailStyle.author}
              >
                By {product.author}
              </a>
            </p>
            <p className={detailStyle.category}>{product.category}</p>
            <button className={detailStyle.buy_button}>Buy now</button>
            <br></br>
            <button className={detailStyle.cart_button}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
