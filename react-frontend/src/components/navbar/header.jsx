/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactSVG } from 'react-svg';

import React, { useState, useEffect } from 'react';
import logo from '../../images/v-arts-logo.png';
import userLogo from '../../images/user.png';
import '../../styles/Login.css';
import { useAuth } from '../../pages/auth';
import { useUser } from '../../UserContext';
import '../../styles/header.css';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

const Header = () => {
  const { user } = useUser();
  const { isLoggedIn, setUserLoggedOut, navigate } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false); // Added state for dropdown
  const [isScrolled, setIsScrolled] = useState(false);
  const [LoginModalVisible, setLoginModalVisible] = useState('');

  useEffect(() => {
  let prevScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY) {
      // Scrolling down
      setIsScrolled(true);
    } else {
      // Scrolling up
      setIsScrolled(currentScrollY > 300); // Adjust the threshold as needed
    }

    prevScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  const handleBuyClick = (e) => {
    console.log('Buy button clicked');
    e.preventDefault();

    // Add logic to handle the buy button click, e.g., redirect to the purchase page
    navigate("/Shop")
  

  };

  const handleUserIconClick = (e) => {
    e.preventDefault();
    
      
    if (!isLoggedIn) {
      // If not logged in, navigate to login
      setLoginModalVisible(!LoginModalVisible);
      console.log('Login modal visible:', LoginModalVisible);
    } else {
      // If logged in, toggle dropdown visibility
      setDropdownVisible(!dropdownVisible);
    }
  };
  
  function getProfilePicture(user) {
    if (user && user.profileData.profileInfo.filename) {
      const Ulogo = `http://localhost:80/${user.profileData.profileInfo.filename}`;
      return { src: Ulogo, isFromDb: true };
    } else {
      const svgString = `<svg width="1200" height="1200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" fill="#0197b2"/>
      <path d="M15.581 16H8.506c-.413 0-.632-.459-.347-.758.847-.889 2.4-2.242 4.008-2.242 1.623 0 3.038 1.38 3.78 2.268.254.304.03.732-.366.732Z" fill="#0197b2" stroke="#0197b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="10" stroke="#0197b2" stroke-width="2"/>
    </svg>`;
      const Ulogo = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
    return { src: Ulogo, isFromDb: false };
    }
  }
  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
  };
  return (
    <main>
      <div className='box-header'>
        <header className={`header ${isScrolled ? 'hidden' : ''}`}>
          <a href="/"><img src={logo} alt="logo" className="header__logo"/></a>
          <nav>
            <ul className="header__menu">
              <li className="header__link"><a href="History">Family Tree</a></li>
              <li className="header__link"><a href="Supporters">Supporters</a></li>
              <li className="header__link">

                <div class="trapezoid">
                <svg width="300" height="75" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <polygon points="50,10 250,10 220,70 80,70" fill="#058AA3" filter="url(#glow)"/>
                  <a href="Shop">
                    <text x="150" y="40" dominant-baseline="middle" text-anchor="middle" fill="white"  class="market_text">
                      Market
                    </text>
                  </a>
                </svg>
                </div>
                
              </li>
              <li className="header__link"><a href="Family">FAQ's</a></li>
              <li className="header__link"><a href="Help">Need Help?</a></li>
            </ul>
          </nav>
          <div className="header__rsection">
          <button className="buy-button" type="button" onClick={handleBuyClick}>BUY</button>
            <div className="header__user__section">
              <a href="#" onClick={handleUserIconClick} className="user-icon">
              <img
                  src={getProfilePicture(user).src}
                  alt="userLogo"
                  className="header__user__icon"
                  style={getProfilePicture(user).isFromDb ? {} : { alignContent: 'center', alignItems: 'center' }}
                  onClick={handleUserIconClick}
                  />
              </a>
            </div>
            <div className="hamburger-button">
            <a href="#" class="" onclick="toggleMenu()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </a>
            
            </div>
          </div>
        </header>
        {isLoggedIn && dropdownVisible && (
              <div className="dropdown-menu">
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => {navigate(`/user/${user.username}`); setDropdownVisible(false)}}>Profile</button>
                    <button className="dropdown-button" onClick={() => navigate('/Settings')}>Settings</button>
                    <button className="dropdown-button" onClick={handleLogout}>Logout</button>
                  </div>
              </div>
            )}
      </div>
      {LoginModalVisible && (
      <Login setLoginModalVisible={setLoginModalVisible} />
      )}


    </main>
  );
};

export default Header;
