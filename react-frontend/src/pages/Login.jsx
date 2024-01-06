// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { useAuth } from './auth';


const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();
  const { loginUser: contextLoginUser } = useUser();

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      // Redirect to the Settings page if the user is logged in
      navigate('/Settings');
    } else {
      setShowLoginForm(!showLoginForm);
      setLoginMessage('');
    }
  };
  
  /**
   * Handles the login process.
   *
   * @param {object} e - The event object.
   * @return {void}
   */
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginMessage('Please enter both username and password.');
      return;
    }
    fetch('http://localhost:80/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loginUser({ username: username });
        } else {
          setLoginMessage('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setLoginMessage('An error occurred during login');
      });
  };

  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
  };

  const handleRegister = () => {
    fetch('http://localhost:80/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loginUser({ username: username });
          setShowLoginForm(false);
        } else {
          setLoginMessage('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setLoginMessage('An error occurred during registration');
      });
  };

  return (
    <main>
      <div className="logout">
        {isLoggedIn ? (
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            {!isLoggedIn && (
              <div className="login-form">
                <form onSubmit={handleLogin}>
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
                  <button type="submit" className="btn" onClick={handleLogin}>
                    Login
                  </button>
                  {!isLoggedIn && (
                    <a href="/Signup">
                      Register
                    </a>
                  )}
                </form>
                {loginMessage && (
                <p className="error-message">{loginMessage}</p>
                )}

              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Login;
