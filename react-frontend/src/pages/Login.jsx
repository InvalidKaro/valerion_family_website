// Login.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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
          // Fetch profile picture data after successful login
          fetch('http://localhost:80/login.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password:  password }),
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
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setLoginMessage('An error occurred during login');
      });
  };
  

  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    try {
      // Send a request to your server to initiate the password reset process
      const response = await fetch('http://localhost:80/mailer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Password reset email sent. Check your email.');
      } else {
        setMessage('Failed to initiate password reset. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('An error occurred during password reset. Please try again later.');
    }
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
      
      <div className="logout">
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
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
                <div className="forgot-password-form">
                <h1>Forgot Password</h1>
                <form onSubmit={handleForgotPassword}>
                  <label htmlFor="email">Enter your email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn">
                    Reset Password
                  </button>
                </form>
                <p>{message}</p>
              </div>
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
