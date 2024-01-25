import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import loginStyle from '../../styles/login.module.css';
const CaptchaComponent = ({isCaptchaValid, setIsCaptchaValid}) => {

  const handleCaptchaChange = (value) => {
    // You can perform any validation or use the captcha value as needed
    setIsCaptchaValid(value !== null);
  };

  return (
      <ReCAPTCHA
        sitekey='6LfbpFspAAAAAN5ND2Li1euFVtOMSaeI8ejJzLxb'
        onChange={handleCaptchaChange}
        onExpired={() => setIsCaptchaValid(false)}
        theme='dark'
      />
  );

};

export default CaptchaComponent;
