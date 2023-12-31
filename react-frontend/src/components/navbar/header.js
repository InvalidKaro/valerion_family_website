import React, { useState } from 'react';
import logo from '../../images/v-arts-logo.png';
import userLogo from '../../images/user.png';

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

  const handleLogin = () => {
    fetch('http://localhost:80/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserLoggedIn(true);
          setShowLoginForm(false);
        } else {
          setLoginMessage('Login failed. Please check your credentials.');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setLoginMessage('An error occurred during login');
      });
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    // Add logic to handle logout, e.g., redirect to the home page
  };

  const handleRegister = () => {
    fetch('http://localhost:80/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
          
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserLoggedIn(true);
          setShowLoginForm(false);
          // Redirect the user or perform additional actions after successful registration
        } else {
          setLoginMessage('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
        setLoginMessage('An error occurred during registration');
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
