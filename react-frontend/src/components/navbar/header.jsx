/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from '../../images/v-arts-logo.png';
import userLogo from '../../images/user.png';
import '../../styles/Login.css';
import { useAuth } from '../../pages/auth';

const Header = () => {
  
  const { isLoggedIn, setUserLoggedOut, navigate } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false); // Added state for dropdown

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
      navigate('/Login');
    } else {
      // If logged in, toggle dropdown visibility
      setDropdownVisible(!dropdownVisible);
    }
  };
  

  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
  };
  return (
    <header className="container header">
      <a href="/"><img src={logo} alt="logo" className="header__logo"/></a>
      <nav>
        <ul className="header__menu">
          <li className="header__link"><a href="History">Our History</a></li>
          <li className="header__link"><a href="Supporters">Supporters</a></li>
          <li className="menu__market">
            <div className='trapezium'>
              <a className='menu__market__text' href="Market">Market</a>
            </div>
          </li>
          <li className="header__link"><a href="FAQs">FAQs</a></li>
          <li className="header__link"><a href="Help">Need Help?</a></li>
        </ul>
      </nav>
      <div className="header__rsection">
        <a href="#" onClick={handleBuyClick}><button className="btn">BUY</button></a>
        <div className="header__user__section">
          <a href="#" onClick={handleUserIconClick} className="user-icon">
            <img
              src={userLogo}
              alt="userLogo"
              className="header__user__icon"
            />
          </a>
          {isLoggedIn && dropdownVisible && (
            <div className="dropdown">
              <button onClick={() => navigate('/Settings')}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
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
  );
};

export default Header;
