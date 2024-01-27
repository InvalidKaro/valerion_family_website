// Login.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import CaptchaComponent from '../components/Captcha/captchaClient'; // Import CaptchaComponent
import loginStyle from '../styles/login.module.css';
import buttonStyle from '../styles/button.module.css';
import textStyle from '../styles/TextStyle.module.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Register from './Register';
const Login = ({ loginModalVisible, setLoginModalVisible }) => {
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
  const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Add the state for isCaptchaValid here
  const [SignUpModalVisible, setSignUpModalVisible] = useState(false);  



  document.addEventListener('DOMContentLoaded', function() {
    // Clear form fields
    document.querySelectorAll('input').forEach(function(input) {
      input.value = '';
    });
  });
  const handleSignup = (e) => {
    if (!isLoggedIn) {
      // If not logged in, navigate to login
      setSignUpModalVisible(!SignUpModalVisible);
      console.log('Login modal visible:', SignUpModalVisible);
    } else {
      // If logged in, toggle dropdown visibility
      }
  };

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

  const closeModal = () => {
    // Close the modal by setting LoginModalVisible to false
    setLoginModalVisible(false);
  };
  const openModal = () => {
    // Close the modal by setting LoginModalVisible to false
    setLoginModalVisible(true);
  };

// Login function, when using https/a domain this will automatically be encrypted
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setLoginMessage('Please enter username, mail and password.');
      return;
    }
    if (!isCaptchaValid) {
      // If captcha is not valid, prevent login
      setLoginMessage('Please complete the captcha.');
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
              setLoginModalVisible(false);

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
  const SignUpClick = (e) => {
    setSignUpModalVisible(!SignUpModalVisible);


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
              <div className={loginStyle.form_container}>
                <div className={loginStyle.overlay} onClick={() => setLoginModalVisible(false)} />
                <div className={`${loginStyle.modal} ${loginModalVisible ? loginStyle.show : ''}` } >
                  <form onSubmit={handleLogin} autoComplete="off" className={loginStyle.form} method='POST'>
                  <div className={loginStyle.x} onClick={() => setLoginModalVisible(false)} >X</div>

                    <h1 className={textStyle.a_h1} >
                      Log into your account
                    </h1>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={loginStyle.input}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={loginStyle.input}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={loginStyle.input}
                      required
                    />
                    {loginMessage && <p className={textStyle.error}>{loginMessage}</p>}
                    <button
                      type="submit"
                      className={buttonStyle.glow_btn}
                      onClick={handleLogin}
                      style={{ marginTop: '30px', borderRadius: '25px' }}
                    >
                      Login
                    </button>
                    <p className={textStyle.a_p} style={{ marginBottom: '45px', fontSize: 'var(--size-xs)', marginTop: '30px' }}>
                      Don't have an account yet?
                    </p>
                    {!isLoggedIn && (
                      <button type= "button" className={loginStyle.link} style={{ marginTop: '10px' }} onClick={SignUpClick} >
                        <p className={textStyle.a_p} style={{ fontSize: 'var(--size-3xl)', letterSpacing: '0.3em', marginTop: '-40px' }}>
                          SIGN UP
                        </p>
                      </button>
                    )}
                    <CaptchaComponent style={{ marginTop: '10px' }} isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid} />
                  </form>
  
                  {failedAttempts >= 2 && (
                    <button className={buttonStyle.glow_btn} onClick={handleForgotPassword} style={{ marginTop: '10px' }}>
                      Forgot Password?
                    </button>
                  )}
  
                </div>
              </div>
            )}
          </>
        )}
      </div>
  
      {SignUpModalVisible && (
      <Register  SignUpModalVisible={SignUpModalVisible} setSignUpModalVisible={setSignUpModalVisible} closeModal={closeModal} openModal={openModal}/>
      )

      }
    </main>
  );
  
};

export default Login;
