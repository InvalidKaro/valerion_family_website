import React, { useState } from 'react';
import logo from '../../images/v-arts-logo.png';
import userLogo from '../../images/user.png';
import '../../styles/Login.css';
import { useAuth } from '../../pages/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();

  const handleBuyClick = () => {
    console.log('Buy button clicked');
    // Add logic to handle the buy button click, e.g., redirect to the purchase page
  };

  const handleUserIconClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      // Redirect to the Settings page if the user is logged in
      navigate('/Settings');
    } else {
      setShowLoginForm(!showLoginForm);
      setLoginMessage('');
    }
  };

  return (
    <header className="container header">
      <a href="/"><img src={logo} alt="logo" className="header__logo"/></a>
      <nav>
        <ul className="header__menu">
          <li className="header__link"><a href="History">Our History</a></li>
          <li className="header__link"><a href="Family">Family Tree</a></li>
          <li className="header__link"><a href="Supporters">Supporters</a></li>
          <li className="header__link"><a href="Help">Need Help?</a></li>
        </ul>
      </nav>
      <div className="header__rsection">
        <a href="#" onClick={handleBuyClick}><button className="btn">BUY</button></a>
        <div className="header__user__section">
          {isUserLoggedIn ? (
            <>
              <span>Welcome, {username}!</span>
            </>
          ) : (
            <>
              <a href="Login" onClick={handleUserIconClick}>
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
