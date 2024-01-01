import art_of_mount_img from '../../images/artOfMount.jpg'
import artist_of_mount_img from '../../images/artistOfMount.jpg'

const price = 50;

const AofM = () => {
    return ( 
        <section class="container aOfM">
            <div class="aOfM__sec">
             <div class="aOfM__header">
                 <p>Art of the mount</p>
                <div class="vertical-line"></div>
                   <p>Artist of mount</p>
             </div>
             <div class="aofM__imgs">
                <div class="img__box">
                    <img src = {art_of_mount_img}></img>
                    <div class="price">{price}$</div> 
                </div>
                <div class="img__box">

                <img src = {artist_of_mount_img}></img>
                <div class="price">{price}$</div> 
                </div>
             </div>

            </div>
        </section>
    );
}
 
export default AofM;