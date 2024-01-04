import React, { useState } from 'react';
import logo from '../../images/v-arts-logo.png';
import userLogo from '../../images/user.png';
import '../../styles/Login.css';
const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleBuyClick = () => {
    console.log('Buy button clicked');
    // Add logic to handle the buy button click, e.g., redirect to the purchase page
  };

  const handleUserIconClick = () => {
    setShowLoginForm(!showLoginForm);
    setLoginMessage('');
  };



  return (
    <header class="container header">
      <a href="/"><img src={logo} alt="logo" class="header__logo"/></a>
      <nav>
        <ul class="header__menu">
          <li class="header__link"><a href="History">Our History</a></li>
          <li class="header__link"><a href="Family">Family Tree</a></li>
          <li class="header__link"><a href="Supporters">Supporters</a></li>
          <li class="header__link"><a href="Help">Need Help?</a></li>
        </ul>
      </nav>
      <div class="header__rsection">
        <a href="#" onClick={handleBuyClick}><button className="btn">BUY</button></a>
        <div className="header__user__section">
          {isUserLoggedIn ? (
            <>
              <span>Welcome, {username}!</span>
            </>
          ) : (
            <>
              <a href="Login">
                <img
                  src={userLogo}
                  alt="userLogo"
                  className="header__user__icon"
                />
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
