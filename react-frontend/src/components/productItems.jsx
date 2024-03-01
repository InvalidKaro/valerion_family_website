import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Fade } from "react-awesome-reveal";
import productStyles from "../styles/product.module.css";

const ProductItems = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  const groupProductsByCategory = (products) => {
    const groupedProducts = {};
    products.forEach((product) => {
      const category = product.category || "No category";
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(product);
    });
    return groupedProducts;
  };

  useEffect(() => {
    fetch("http://localhost:80/products.php")
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
        console.error("Error fetching data:", error);
      });
  }, []);
  const renderProductSlides = (products) => {
    return products.map((product) => (
      <SwiperSlide key={product.id} className={productStyles.productSlide}>
        <div className={productStyles.productCard}>
          <a key={product.id} href={`/product/${product.id}`}>
            <img src={product.pictureUrl} alt={product.title} />
          </a>
          <div className={productStyles.productInfo}>
            {/* Additional content for the overlay */}
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "80%" }}>
          <h3 className={productStyles.productTitle}>{product.title}</h3>
          <p className={productStyles.productPrice}>Price: {product.price}</p>
          <a
            href={`/user/${product.author}`}
            className={productStyles.authorLink}
          >
            Author: {product.author}
          </a>
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <Fade>
    <div className={productStyles.container}>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div className={productStyles.categoryContainer} key={category}>
          <h2 className={productStyles.category} style={{ marginTop: "20px",display: "flex", fontSize: "clamp(2rem, 3rem, 4rem)"}}>
            {category}
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={"auto"}
            centeredSlides={false}
            navigation
            pagination={{ clickable: true }}
            fadeEffect={{ crossFade: true }}
            className={productStyles.swiper}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {renderProductSlides(products)}
          </Swiper>
        </div>
      ))}
    </div>
    </Fade>
  );
};

export default ProductItems;
