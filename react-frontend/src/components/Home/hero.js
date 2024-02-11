import React, { useEffect, useState } from 'react';
import heroStyles from '../../styles/hero.module.css';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:80/imageFetch.php');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched images:', data); // Log the fetched data
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    
    };

    fetchImages();

    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, 7500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main>
      <section className={`${heroStyles.container} ${heroStyles.hero}`}>
        <div className={heroStyles.imageContainer}>
          {images.map((imageUrl, index) => (
            <img
              key={index}
              className={`${heroStyles.heroImage} ${
                index === currentImage ? heroStyles.visible : heroStyles.hidden
              }
              ${heroStyles.zoomEffect}`}
              src={imageUrl}
              alt={`Hero ${index}`}
            />
          ))}
        </div>
        <div className={heroStyles.frameOverlay}></div>
        <div className={heroStyles.heroContent}>
          <h1 className={`${heroStyles.heroTitle} ${heroStyles.smoothEffect}`}>
            Beyond Pixels
          </h1>
 
          <p className={`${heroStyles.heroDescription} ${heroStyles.smoothEffect} ${heroStyles.pulsateEffect}`}>
            Your Dream, Our Work
          </p>
          <p className={`${heroStyles.heroMotto} ${heroStyles.smoothEffect}`}>
            AI Artistry Marketplace
          </p>
        </div>
      </section>
    </main>
  );
};

export default Hero;
