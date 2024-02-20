// Login.js
import React, { useEffect, useState } from "react";
import textStyle from "../styles/TextStyle.module.css";
import buttonStyle from "../styles/button.module.css";
import loginStyle from "../styles/login.module.css";
import { useAuth } from "./auth";
const ForgotPassword = () => {
  const [loginMessage] = useState("");
  const { isLoggedIn, setUserLoggedOut, navigate } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [profilePicture, setProfilePicture] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    try {
      // Send a request to your server to initiate the password reset process
      const response = await fetch("http://localhost:80/mailer.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password reset email sent. Check your email.");
      } else {
        setMessage(
          "Failed to initiate password reset. Please check your email and try again."
        );
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage(
        "An error occurred during password reset. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Reload the page once after successful login
      navigate("/");
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);
  return (
    <main>
      <div
        className={loginStyle.container}
        style={{ marginTop: "10%", marginBottom: 0 }}
      >
        <form
          className={loginStyle.form}
          onSubmit={handleForgotPassword}
          style={{ marginTop: "100px" }}
        >
          <h1 classname={textStyle.h1}>Forgot Password</h1>
          <p
            className={textStyle.text}
            style={{ marginTop: "80px", marginBottom: "50px" }}
          >
            Forgot your Password?
            <br />
            Enter your email and we will send you a link to reset your password.
          </p>
          <label htmlFor="email" className={loginStyle.label}>
            Enter your email:
          </label>
          <input
            className={loginStyle.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle.glow_btn}>
            Reset Password
          </button>
        </form>
        <br></br>
        <p>{message}</p>
        {loginMessage && <p className={textStyle.error}>{loginMessage}</p>}
      </div>
    </main>
  );
};

export default ForgotPassword;
