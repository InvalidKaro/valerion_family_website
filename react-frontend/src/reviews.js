import review_profile_img from './images/artOfMount.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const Reviews = () => {
    return (

            <section class="container reviews">
                 <Swiper class="reviews"
                    spaceBetween={0}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>
                <div className="review__card">
                    <img class="card__img"  src={review_profile_img} alt="" />
                    <h1 className="card__username">Veskata</h1>
                    <p className="card__review"><span>"</span>The best website for AI generated images. I made 10K in first month!<span>"</span></p>
                    <div className="card__stars__sec">
                        <div class="rating">
                            <span class="star full"></span>
                            <span class="star full"></span>
                            <span class="star half"></span>
                            <span class="star empty"></span>
                            <span class="star empty"></span>
                        </div>
                    </div> 
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="review__card">
                    <img class="card__img"  src={review_profile_img} alt="" />
                    <h1 className="card__username">Jordan</h1>
                    <p className="card__review"><span>"</span>Suyyyyyyyy<span>"</span></p>
                    <div className="card__stars__sec">
                        <div class="rating">
                            <span class="star full"></span>
                            <span class="star full"></span>
                            <span class="star half"></span>
                            <span class="star empty"></span>
                            <span class="star empty"></span>
                        </div>
                    </div> 
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="review__card">
                    <img class="card__img"  src={review_profile_img} alt="" />
                    <h1 className="card__username">Dimoff</h1>
                    <p className="card__review"><span>"</span>Maznaaaaaa<span>"</span></p>
                    <div className="card__stars__sec">
                        <div class="rating">
                            <span class="star full"></span>
                            <span class="star full"></span>
                            <span class="star half"></span>
                            <span class="star empty"></span>
                            <span class="star empty"></span>
                        </div>
                    </div> 
                </div>
                </SwiperSlide>
                </Swiper> 
               
                
            </section>
        
    );
}
 
export default Reviews;