// Register.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import loginStyle from '../styles/login.module.css';
import buttonStyle from '../styles/button.module.css';
import textStyle from '../styles/TextStyle.module.css';	

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
      <div className={loginStyle.container} style={{ marginTop: '10px' }}>
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            {!isLoggedIn && (
              <div className={loginStyle.loginForm} style={{ marginTop: '10px' }}>
                <form className={loginStyle.form} onSubmit={handleRegister} method='POST'>
                <h1 className={textStyle.a_h1} style={{  marginBottom: '50px'}}>
                  Create an account
                </h1>
                  <input
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    className={loginStyle.input}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={loginStyle.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={loginStyle.input}
                  />
                  {loginMessage && (
                <p className={textStyle.error}>{loginMessage}</p>
                )}

                  <button className={buttonStyle.glow_btn} onClick={handleRegister} style={{ marginTop: '30px', borderRadius: '25px' }}>
                    Register
                  </button>
                  <a href="/Login" className={loginStyle.link}>
                    Login
                  </a>
                </form>
                
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Login;
