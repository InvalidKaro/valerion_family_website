// Login.js
import React, { useEffect, useState } from "react";
import CaptchaComponent from "../components/Captcha/captchaClient"; // Import CaptchaComponent
import textStyle from "../styles/TextStyle.module.css";
import buttonStyle from "../styles/button.module.css";
import loginStyle from "../styles/login.module.css";
import Register from "./Register";
import { useAuth } from "./auth";

import PrimaryButton from "../styles/effects.btn.expand";

const Login = ({ loginModalVisible, setLoginModalVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { isLoggedIn, loginUser, setUserLoggedOut, navigate } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [profilePicture, setProfilePicture] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Add the state for isCaptchaValid here
  const [SignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [captchaRef, setCaptchaRef] = useState(null);

  document.addEventListener("DOMContentLoaded", function () {
    // Clear form fields
    document.querySelectorAll("input").forEach(function (input) {
      input.value = "";
    });
  });

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
      setLoginMessage("Please enter username, mail, and password.");
      return;
    }
    if (!isCaptchaValid) {
      // If captcha is not valid, prevent login
      setLoginMessage("Please complete the captcha.");
      return;
    }
    const token = captchaRef.current?.getValue();
    console.log("Token:", token);

    // Send login request
    fetch("http://localhost:80/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        token: token,
      }),
      timeout: 10000, // Set timeout to 10 seconds (adjust as needed)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Successful login, process profile data directly
          setLoginMessage("Login successful!");
          setFailedAttempts(0);

          console.log("Profile data:", data);

          // Include profile picture data in loginUser function
          if (data.success) {
            if (!data.profileInfo.filename.startsWith("profile_pictures/")) {
              data.profileInfo.filename =
                "profile_pictures/" + data.profileInfo.filename;
            }
            loginUser({ username: username, profileData: data });
            setLoginModalVisible(false);
            document.body.style.overflow = "auto";
          } else {
            setLoginMessage("Error processing profile data.");
            throw new Error("Profile data processing failed");
          }
        } else {
          setLoginMessage("Login failed. Please check your credentials.");
          setFailedAttempts((prevAttempts) => prevAttempts + 1);
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setLoginMessage("An error occurred during login");
        setFailedAttempts((prevAttempts) => prevAttempts + 1);
      })
      .finally(() => {
        captchaRef.current?.reset(); // Reset the captcha regardless of success or failure
      });
  };
  const SignUpClick = (e) => {
    setSignUpModalVisible(!SignUpModalVisible);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoginModalVisible(false);
    navigate("/forgotPassword");
  };

  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
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
      <div className={loginStyle.container}>
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            {!isLoggedIn && (
              <div className={loginStyle.form_container}>
                <div
                  className={loginStyle.overlay}
                  onClick={() => setLoginModalVisible(false)}
                />
                <div
                  className={`${loginStyle.modal} ${
                    loginModalVisible ? loginStyle.show : ""
                  }`}
                >
                  
                  <form
                    onSubmit={handleLogin}
                    autoComplete="off"
                    className={loginStyle.form}
                    method="POST"
                  >
                    <div
                      className={loginStyle.x}
                      onClick={() => setLoginModalVisible(false)}
                    >
                      X
                    </div>

                    <h1
                      className={textStyle.a_h1}
                      style={{ fontSize: "clamp(2rem, 5vw, var(--size-6xl))" }}
                    >
                      WELCOME
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
                    {loginMessage && (
                      <p className={textStyle.error}>{loginMessage}</p>
                    )}
                    <div className="captcha" style={{scale: "1.31", marginTop: "30px"}}>
                      <CaptchaComponent
                        style={{ marginTop: "10px"}}
                        isCaptchaValid={isCaptchaValid}
                        setIsCaptchaValid={setIsCaptchaValid}
                        setCaptchaRef={setCaptchaRef}
                      />
                    </div>
                    <PrimaryButton text="Login"/>
                    {/*<button
                      type="submit"
                      className={buttonStyle.login_btn}
                      onClick={handleLogin}
                      style={{ marginTop: "30px", borderRadius: "50px", width: "clamp(250px, 75%, 400px)" }}
                    >

                      Login
                      <span class="round" />
                    </button>*/}
                    <br></br>
                    

                    {!isLoggedIn && (
                      <button
                        type="button"
                        className={loginStyle.link}
                        style={{}}
                        onClick={SignUpClick}
                      >
                        <p
                          className={textStyle.a_p}
                          style={{
                            fontSize: "var(--size-lg)",
                            marginTop: "1%",
                            overflow: "show",
                            textDecoration: "none",
                            color: "gray"
                          }}
                        >
                          Don't have an account? <a className={loginStyle.hover} style={{color: "white"}}>Sign Up</a>
                        </p>
                      </button>
                    )}
                  </form>

                  {failedAttempts >= 2 && (
                    <button
                      className={buttonStyle.glow_btn}
                      onClick={handleForgotPassword}
                      style={{ marginTop: "10px" }}
                    >
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
        <>
          <Register
            SignUpModalVisible={SignUpModalVisible}
            setSignUpModalVisible={setSignUpModalVisible}
            closeModal={closeModal}
            openModal={openModal}
          />
        </>
      )}
    </main>
  );
};

export default Login;
