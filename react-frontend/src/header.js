import React, { useState } from 'react';
import logo from './images/v-arts-logo.png';
import userLogo from './images/user.png';

const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleBuyClick = () => {
    // Handle the buy button click, e.g., redirect to the purchase page
    console.log('Buy button clicked');
  };

  const handleUserIconClick = () => {
    // Toggle the visibility of the login form
    setShowLoginForm(!showLoginForm);
    setLoginMessage(''); // Clear previous login messages when the form is opened
  };

  const handleLogin = () => {
    // Send a login request to the PHP server
    fetch('/login.php', { // Assuming login.php is in the same folder as the React app
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserLoggedIn(true);
          setShowLoginForm(false);
        } else {
          setLoginMessage(data.message);
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setLoginMessage('An error occurred during login');
      });
  };

  const handleLogout = () => {
    // Mock logout function
    setUserLoggedIn(false);
  };

  const handleRegister = () => {
    // Send a register request to the PHP server
    fetch('/register.php', { // Assuming register.php is in the same folder as the React app
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message); // You can handle the registration response accordingly
      })
      .catch(error => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration');
      });
  };

  return (
    <header className="container header">
      <img src={logo} alt="logo" className="header__logo" />
      <nav>
        {/* ... (menu items) */}
      </nav>
      <div className="header__rsection">
        <a href="#" onClick={handleBuyClick}><button className="btn">BUY</button></a>
        <div className="header__user__section">
          {isUserLoggedIn ? (
            <>
              <span>Welcome, {username}!</span>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <a href="#" onClick={handleUserIconClick}>
                <img
                  src={userLogo}
                  alt="userLogo"
                  className="header__user__icon"
                />
              </a>
              {showLoginForm && (
                <div className="login-form">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn" onClick={handleLogin}>Login</button>
                  <button className="btn" onClick={handleRegister}>Register</button>
                  {loginMessage && <p>{loginMessage}</p>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
