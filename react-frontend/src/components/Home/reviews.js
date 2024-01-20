import { useState, useEffect } from 'react';
import review_profile_img from '../../images/artOfMount.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

import '../../styles/reviews.css'; // Import the CSS file for the Reviews component

import WriteReviewButton from './writeReview';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/reviews.php')
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        console.log('reviews:', data); // Add this line to log the reviews
      })
      .catch((error) => {
        console.log('reviews:', reviews); // Add this line to log the reviews
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderReviews = () => {
    return reviews.map((review) => (
      <SwiperSlide key={review.author} className="review__card">
        <div className="card_top_section">
          <img className="card__img" src={review.profile_img} alt="" />
          <h1 className="card__username">{review.author}</h1>
        </div>
        <p className="card__review">
          <span>" </span>
          {review.text}
          <span> "</span>
        </p>
        <div className="card__stars__sec">
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < review.stars ? "full" : "empty"}></span>
            ))}
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <>
      <section className="container">
        <Swiper
          slidesPerView={3}
          spaceBetween={140}
          centeredSlides={false}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="reviews-container"
        >
        {renderReviews()}
vzr
        </Swiper>

      </section>
      <WriteReviewButton setReviews={setReviews}/>

    </>
  );
};

export default Reviews;
