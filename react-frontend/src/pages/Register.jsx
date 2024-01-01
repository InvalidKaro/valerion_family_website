// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { useAuth } from './auth';


const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [mail, setMail] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();
  const { loginUser: contextLoginUser } = useUser();

  const handleUserIconClick = () => {
    setShowLoginForm(!showLoginForm);
    setLoginMessage('');
  };

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
      body: JSON.stringify({ username: username, password: password, mail:mail}),
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
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
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
                  
                  <button className="btn" onClick={handleRegister}>
                    Register
                  </button>
                  <a href="/Login">
                    Login
                  </a>
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
