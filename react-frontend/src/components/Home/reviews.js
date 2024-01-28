import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';

import '../../styles/reviews.css'; // Import the CSS file for the Reviews component

import WriteReviewButton from './writeReview';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('http://localhost:80/reviews.php')
      .then((response) => response.json())
      .then((data) => {
        const formattedReviews = data.map((review) => ({
          ...review,
          stars: parseInt(review.stars) // Convert stars to a number
        }));
        setReviews(formattedReviews);
        console.log('reviews:', formattedReviews);
      })
      .catch((error) => {
        console.log('reviews:', reviews);
        console.error('Error fetching data:', error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          modules={[Navigation, Pagination, Mousewheel]}
          className="reviews-container"
        >
        {renderReviews()}

        </Swiper>

      </section>
      <WriteReviewButton setReviews={setReviews}/>

    </>
  );
};

export default Reviews;
