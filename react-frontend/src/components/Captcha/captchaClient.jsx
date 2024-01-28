import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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
        style={{transform:"scale(1.0)", transformOrigin:"0 0"}}
      />
  );

};

export default CaptchaComponent;
