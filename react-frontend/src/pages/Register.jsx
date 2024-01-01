import React, { useState } from 'react';
import logo from './../images/v-arts-logo.png';
import userLogo from './../images/user.png';

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

    <main>
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
        </div>
        <div className="header__user__section">

                <a href="#" onClick={handleUserIconClick}>
                  <img
                    src={userLogo}
                    alt="userLogo"
                    className="header__user__icon"
                  />
                </a>
                
                <div className="login-form">
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis mattis venenatis. Donec sollicitudin est iaculis dapibus mattis. Morbi felis nibh, rhoncus eu lectus in, faucibus congue diam. Phasellus a erat et augue accumsan lacinia eu ac nulla. Phasellus commodo, felis nec aliquam blandit, erat lorem finibus odio, non tempus nisl risus vitae nunc. Ut vulputate quam ut vulputate lobortis. Phasellus elit ante, pharetra id gravida ut, pellentesque id justo. Aliquam sit amet eleifend lectus. In ac tellus porttitor, venenatis urna vitae, sollicitudin leo. Nunc dictum nulla vel molestie tempus. Donec fermentum nibh sit amet ex vulputate sagittis. Sed rhoncus molestie eros at consectetur. Nulla quis maximus mi, ac imperdiet metus.</h2>
                    <button className="btn" onClick={handleLogin}>Register</button>
                    {loginMessage && <p>{loginMessage}</p>}
                    Already have an account? <a href="Login"><u>Log in here</u></a>
                    
                </div>
               
          </div>
    </main>
    );
  };
  
  export default Header;
  