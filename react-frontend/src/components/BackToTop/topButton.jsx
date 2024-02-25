import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Import CSS for styling

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to the top of the page when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? 'show' : 'hide'}`} onClick={scrollToTop}>
      <i className="fas fa-arrow-up"></i>
      <span className="scroll-to-top-text">Scroll back to top</span>
    </div>
  );
};

export default ScrollToTopButton;
