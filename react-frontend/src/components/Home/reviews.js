import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import reviewStyles from '../../styles/review.module.css'; // Import the CSS file for the Reviews component

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
      return reviews.map((review, index) => (
        <SwiperSlide key={`${review.author}-${review.id || index}`} className={reviewStyles.review__card}>
          <div className={reviewStyles.card_top_section}>
            <img className={reviewStyles.card__img} src={review.profile_img} alt="" />
            <h1 className={reviewStyles.card__username}>{review.author}</h1>
          </div>
          <p className={reviewStyles.card__review}>
            <span className={reviewStyles.quotationMark}>" </span>
            {review.text}
            <span className={reviewStyles.quotationMark}>"</span>
          </p>
          <div className={reviewStyles.card__stars__sec}>
          <div className={reviewStyles.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < review.stars ? reviewStyles.full : reviewStyles.empty}></span>
            ))}
          </div>
          </div>
        </SwiperSlide>
      ));
    };
  
    return (
      <>
        <Fade cascade >
        
        <section className={reviewStyles.container} style={{ marginTop: "50vh" }}>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
        
            centeredSlides={false}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination, Mousewheel]}
            className={reviewStyles.reviewsContainer}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 60,
              },
            }}
          >
            {renderReviews()}
          </Swiper>
        </section>
        </Fade>
        <WriteReviewButton setReviews={setReviews} />

      </>
    );

};

export default Reviews;
