// import hero_bg from '../../images/hero_bg.png';

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
            
            <section style={sectionStyle} class="container hero">
            <h1>Beyond Pixels: AI Artistry Marketplace </h1>
            <p class="hero__motto">Your Dream, Our Work</p>
            <p style={ { marginTop: '1%' }}>The most innovative place to buy and sell online art.</p>
            {/* <img src={hero_bg} alt="hero-bg" className='hero-bg'/> */}
            </section> 
            
    );
}
 
export default Hero;