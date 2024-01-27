// Register.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import loginStyle from '../styles/login.module.css';
import buttonStyle from '../styles/button.module.css';
import textStyle from '../styles/TextStyle.module.css';	
import CaptchaComponent from '../components/Captcha/captchaClient';
import Login from './Login';
const Register = ( {SignUpModalVisible, setSignUpModalVisible, closeModal } ) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [mail, setMail] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();

  // Later on it will be .env
  const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Add the state for isCaptchaValid here
  // eslint-disable-next-line no-unused-vars
  const [loginModalVisible, setLoginModalVisible] = useState(false); // Add the state for loginModalVisible here

  const handleLoginModalOpen = () => {
    setSignUpModalVisible(false); // Close the signup/register modal
    setLoginModalVisible(true); // Open the login modal
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
          setSignUpModalVisible(false);
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
      <div className={loginStyle.container}>
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            {!isLoggedIn && (
              <div className={loginStyle.form_container}>
                <div className={loginStyle.overlay} onClick={(e) => setSignUpModalVisible(false)} />
                <div className={`${loginStyle.modal} ${SignUpModalVisible ? loginStyle.show : ''}` } >
                  <form onSubmit={handleRegister} autoComplete="off" className={loginStyle.form} method='POST'>
                  <div className={loginStyle.x} onClick={ (e) => { setSignUpModalVisible(false); closeModal(false); } }>X</div>

                    <h1 className={textStyle.a_h1} >
                      Create  your account
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
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
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
                      onClick={handleRegister}
                      style={{ marginTop: '30px', borderRadius: '25px' }}
                    >
                      Sign Up
                    </button>
                    <p className={textStyle.a_p} style={{ marginBottom: '45px', fontSize: 'var(--size-xs)', marginTop: '30px' }}>
                      Already have an account?
                    </p>
                    {!isLoggedIn && (
                      <button type='button' className={loginStyle.link} style={{ marginTop: '10px' }} onClick={handleLoginModalOpen}> 
                        <p className={textStyle.a_p} style={{ fontSize: 'var(--size-3xl)', letterSpacing: '0.3em', marginTop: '-40px' }}>
                          LOG IN
                        </p>
                      </button>
                    )}
                    <CaptchaComponent style={{ marginTop: '10px' }} isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid} />
                  </form>
  
                
  
                </div>
              </div>
            )}
          </>
        )}
      </div>
 
    </main>
  );
};

export default Register;
