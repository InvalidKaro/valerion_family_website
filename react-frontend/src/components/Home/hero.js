// import hero_bg from '../../images/hero_bg.png';
import heroStyles from '../../styles/hero.module.css';
const Hero = () => {
    const sectionStyle = {
        cursor: 'default',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',

      };
    return (
            
      <section style={sectionStyle} className={`${heroStyles.container} ${heroStyles.hero}`}>
      <h1 className={heroStyles.hero__title}>Beyond Pixels: AI Artistry Market<wbr></wbr>place</h1>
      <p className={heroStyles.hero__motto}>Your Dream, Our Work</p>
      <p className={heroStyles.hero__description}>The most innovative place to buy and sell online art.</p>
    </section>
            
    );
}
 
export default Hero;