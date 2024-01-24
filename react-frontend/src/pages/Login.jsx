// Login.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import loginStyle from '../styles/login.module.css';
import buttonStyle from '../styles/button.module.css';
import textStyle from '../styles/TextStyle.module.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [profilePicture, setProfilePicture] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);

  /**
   * Handles the login process.
   *
   * @param {object} e - The event object.
   * @return {void}
   */
/*
import React from 'react';
import { AES } from 'react-crypto-js';

const MyComponent = () => {
  const plaintext = 'Hello, World!';
  const secretKey = 'my-secret-key';

  // Encrypt
  const ciphertext = AES.encrypt(plaintext, secretKey).toString();
  console.log('Encrypted:', ciphertext);

  // Decrypt
  const bytes = AES.decrypt(ciphertext, secretKey);
  const decryptedText = bytes.toString();

  return (
    <div>
      <p>Encrypted: {ciphertext}</p>
      <p>Decrypted: {decryptedText}</p>
    </div>
  );
};

export default MyComponent;
*/



// Login function, when using https/a domain this will automatically be encrypted
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setLoginMessage('Please enter username, mail and password.');
      return;
    }
    fetch('http://localhost:80/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Fetch profile picture data after successful login
          fetch('http://localhost:80/login.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password:  password }),
          })
            .then((profileResponse) => profileResponse.json())
            .then((profileData) => {
              console.log('Profile data:', profileData);
              // Include profile picture data in loginUser function
              if (!profileData.profileInfo.filename.startsWith('profile_pictures/')) {
                profileData.profileInfo.filename = 'profile_pictures/' + profileData.profileInfo.filename;
              }
              loginUser({ username: username, profileData: profileData });
              navigate('/');
            })
            .catch((profileError) => {
              console.error('Error during profile picture fetch:', profileError);
              // Still log in the user even if fetching profile data fails
              loginUser({ username: username });
            });
        } else {
          setLoginMessage('Login failed. Please check your credentials.');
          setFailedAttempts(prevAttempts => prevAttempts + 1);

        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setLoginMessage('An error occurred during login');
        setFailedAttempts(prevAttempts => prevAttempts + 1);
      });
  };
  

  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    navigate('/forgotPassword');
  };
  
  
  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
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
      
      <div className={loginStyle.container}>
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            {!isLoggedIn && (
              
              <div className={loginStyle.form}>
                <h1 className={textStyle.h1} style={{ marginTop: '100px', marginBottom: '-50px'}}>Log into your account</h1>

                <form onSubmit={handleLogin} autocomplete="off" className={loginStyle.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={loginStyle.input}
                  />
                  <input
                    type="email"
                    placeholder="Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={loginStyle.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={loginStyle.input}
                  />
                  <button type="submit" className={buttonStyle.glow_btn} onClick={handleLogin} style={{ marginTop: '20px' }}>
                    Login
                  </button>
                  {!isLoggedIn && (
                    <a href="/Signup" className={loginStyle.link} style={{ marginTop: '10px' }}>
                      Don't have an account yet?
                      <br></br>
                      <br></br>
                      S I G N U P
                    </a>
                
                  )}
                </form>
                {loginMessage && (
                <p className={textStyle.error}>{loginMessage}</p>
                )}

                {failedAttempts >= 2 && (
                  <button className={buttonStyle.glow_btn} onClick={handleForgotPassword} style={{ marginTop: '10px' }}>
                    Forgot Password?
                  </button>
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
