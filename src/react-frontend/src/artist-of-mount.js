import art_of_mount_img from './images/artOfMount.jpg'
import artist_of_mount_img from './images/artistOfMount.jpg'

const price = 50;

const AofM = () => {
    return ( 
        <section class="container aOfM">
            <div class="aOfM__sec">
            <p>Art of the mount</p>
            <img src = {art_of_mount_img}></img>
            <div class="price">{price}$</div>
            </div>
            <div class="line-holder"><div class="vertical-line"></div></div>
            
            <div class="aOfM__sec">
            <p>Artist of mount</p>
            <img src = {artist_of_mount_img}></img>
            <div class="price">{price}$</div>
            </div>
        </section>
    );
}
 
export default AofM;