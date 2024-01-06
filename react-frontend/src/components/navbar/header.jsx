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
  const [dropdownVisible, setDropdownVisible] = useState(false); // Added state for dropdown

  const handleBuyClick = () => {
    console.log('Buy button clicked');
    // Add logic to handle the buy button click, e.g., redirect to the purchase page
  };

  const handleUserIconClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false); // Close the login form if open
      
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
          <li className="header__link"><a href="Family">Family Tree</a></li>
          <li className="header__link"><a href="Supporters">Supporters</a></li>
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
      </div>
    </header>
  );
};

export default Header;
