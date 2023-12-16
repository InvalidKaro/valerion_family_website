import art_of_mount_img from './images/artOfMount.jpg'

const Reviews = () => {
    return (

            <section class="container reviews swiper">
                <div className="slide-content">
                    <div className="card-wrapper swiper-wrapper">
                        <div className="card swiper-slide">
                            <div className="image-content">
                                <span className="overlay">

                                </span>
                                <div className="card-image">
                                    <img src={art_of_mount_img} alt="" className="card-img" />
                                </div>
                            </div>
                            <div className="card-content">
                                <h2 className="name">Veskata</h2>
                                <p className="decription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, neque omnis! Numquam iusto officiis ad provident in? Eum culpa neque, excepturi laudantium ad, ipsa ipsam pariatur, doloremque quasi odit adipisci.</p>

                                <button className="button">View More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="./swiper-bundle.min.js"></script>
                
            </section>
        
    );
}
 
export default Reviews;