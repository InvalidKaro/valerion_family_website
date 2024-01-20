import React, { useState, useEffect } from 'react';
import '../styles/flyout.css';

function Flyout({ user, duration }) {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`flyout ${isVisible ? 'visible' : ''}`}>
      Welcome, {user}
    </div>
  );
}

export default Flyout;