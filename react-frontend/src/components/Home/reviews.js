import review_profile_img from '../../images/artOfMount.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination,} from 'swiper/modules';

const demo_card = (
<SwiperSlide className="review__card">
 <div className="card_top_section">
    <img class="card__img"  src={review_profile_img} alt="" />
    <h1 className="card__username">Veskata</h1>
 </div>
<p className="card__review"><span>" </span>The best website for AI generated images. I made 10K in first month!<span> "</span></p>
<div className="card__stars__sec">
    <div class="rating">
        <span class="star full"></span>
        <span class="star full"></span>
        <span class="star half"></span>
        <span class="star empty"></span>
        <span class="star empty"></span>
    </div>
</div> 
</SwiperSlide>
);


const Reviews = () => {
    return (
        <>
        <section class="container">
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
             {demo_card}
             {demo_card}
             {demo_card}
             {demo_card}
          </Swiper>
        </section>
        </>
      );
}
 
export default Reviews;