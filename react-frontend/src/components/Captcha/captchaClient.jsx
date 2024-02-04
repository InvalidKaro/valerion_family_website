import React, { Suspense, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ErrorBoundary from "../../functions/errorBoundary"; // You will need to import the ErrorBoundary component

const CaptchaComponent = ({ isCaptchaValid, setIsCaptchaValid, setCaptchaRef  }) => {
  const captchaRef = useRef(null)

  const handleCaptchaChange = (value) => {
    // You can perform any validation or use the captcha value as needed
    setIsCaptchaValid(value !== null);
    setCaptchaRef(captchaRef);
  };

  const style = {
    marginInline: "auto", transform: "scale(0.8)", maxWidth: "90%", overflow: "hidden"
  }
  
  const renderError = (error, errorInfo) => {
    return (
      <div>
        <h2>Error: Captcha failed to load</h2>
        <p>{error.toString()}</p>
        <pre>{errorInfo.componentStack}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary errorRenderer={renderError}>
      <Suspense fallback={<div style={style}>Loading Captcha...</div>}>
        <ReCAPTCHA
          sitekey="6LfbpFspAAAAAN5ND2Li1euFVtOMSaeI8ejJzLxb"
          ref={captchaRef}
          onChange={handleCaptchaChange}
          onExpired={() => setIsCaptchaValid(false)}
          onAbort={() => setIsCaptchaValid(false)}
          onErrored={() => setIsCaptchaValid(false)}
          
          theme="dark"
          type="image"
          size="normal"
          badge="bottomright"
          style={{style}}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CaptchaComponent;