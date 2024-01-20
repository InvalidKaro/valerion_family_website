import React, { useState, useEffect } from 'react';
import '../styles/cookies.css';

function CookiePopup({ onAccept, onDeny }) {
  const [showCookiePopup, setShowCookiePopup] = useState(true);
  const [cookiePreferences, setCookiePreferences] = useState({
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [allowAllCookies, setAllowAllCookies] = useState(false);

  useEffect(() => {
    const acceptedCookies = localStorage.getItem('acceptedCookies');
    if (acceptedCookies) {
      setShowCookiePopup(false);
    }
  }, []);

  useEffect(() => {
    if (allowAllCookies) {
      setCookiePreferences({
        analytics: true,
        marketing: true,
        preferences: true,
      });
    }
  }, [allowAllCookies]);

  const handleAcceptCookies = () => {
    let acceptedCookies = '';
    if (allowAllCookies) {
      acceptedCookies = 'all';
    } else {
      Object.keys(cookiePreferences).forEach((cookieName) => {
        if (cookiePreferences[cookieName]) {
          acceptedCookies += `${cookieName}\n`;
        }
      });
    }
    localStorage.setItem('acceptedCookies', acceptedCookies);
    setShowCookiePopup(false);
  };

  const handleDenyCookies = () => {
    localStorage.setItem('acceptedCookies', 'none');
    setShowCookiePopup(false);
  };

  const handleToggleCookie = (cookieName) => {
    if (!allowAllCookies) {
      setCookiePreferences((prevState) => ({
        ...prevState,
        [cookieName]: !prevState[cookieName],
      }));
    }
  };

  return (
    <>
      {showCookiePopup && (
        <div className="cookie-popup">
          <p>
            This website uses cookies. By continuing to use this site, you consent to the use of cookies.
          </p>
          <div className="cookie-toggle">
            <label>
              <span>Analytics</span>
              <span
                className={`switch ${cookiePreferences.analytics || allowAllCookies ? 'on' : 'off'}`}
                onClick={() => handleToggleCookie('analytics')}
              ></span>
            </label>
            <label>
              <span>Marketing</span>
              <span
                className={`switch ${cookiePreferences.marketing || allowAllCookies ? 'on' : 'off'}`}
                onClick={() => handleToggleCookie('marketing')}
              ></span>
            </label>
            <label>
              <span>Preferences</span>
              <span
                className={`switch ${cookiePreferences.preferences || allowAllCookies ? 'on' : 'off'}`}
                onClick={() => handleToggleCookie('preferences')}
              ></span>
            </label>
          </div>
          <div className="allow-all-cookies">
            <label>
              <span>Allow all cookies</span>
              <span
                className={`switch ${allowAllCookies ? 'on' : 'off'}`}
                onClick={() => setAllowAllCookies(!allowAllCookies)}
              ></span>
            </label>
          </div>
          <div className="button-container">
            <button onClick={handleDenyCookies}>Deny</button>
            <button onClick={handleAcceptCookies}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CookiePopup;