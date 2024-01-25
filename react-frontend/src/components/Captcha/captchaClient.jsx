import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const CaptchaComponent = () => {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptchaChange = (value) => {
    // You can perform any validation or use the captcha value as needed
    setIsCaptchaValid(value !== null);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey='6LfbpFspAAAAAN5ND2Li1euFVtOMSaeI8ejJzLxb'
        onChange={handleCaptchaChange}
      />
      {isCaptchaValid && <p>Captcha is valid!</p>}
    </div>
  );
};

export default CaptchaComponent;
