// Register.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';


const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [mail, setMail] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      // Redirect to the Settings page if the user is logged in
      navigate('/Settings');
    } else {
      setShowLoginForm(!showLoginForm);
      setLoginMessage('');
    }
  };


  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Mail:', mail);
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
          setLoginMessage('Successfully registered! Verification-Mail sent!');
        } else {
          setLoginMessage('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setLoginMessage('An error occurred during registration');
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      // Reload the page once after successful login
      navigate('/');
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);
  return (
    <main>
      <div className="logout">
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            {!isLoggedIn && (
              <div className="login-form">
                <form onSubmit={handleRegister} method='POST'>
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
