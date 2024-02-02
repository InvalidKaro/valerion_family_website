/* eslint-disable no-useless-escape */
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { useUser } from '../../UserContext.js';
import buttonStyle from '../../styles/button.module.css';
import loginStyle from '../../styles/login.module.css';
import '../../styles/settings.css';
const ChangePassword = () => {
  const { user } = useUser(); // Use the useUser hook here
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    /* 
    check if currentPassword is correct
    and if newPassword matches confirmPassword
    */

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    
    // Check if the new password meets the required criteria
    if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)
    ) {
      setMessage(
        'New password must be at least 8 characters long and contain at least one uppercase letter and one special character.'
      );
      return;
    }
    
    // Check if the new password is the same as the current password
    if (newPassword === currentPassword) {
      setMessage('New password cannot be the same as the current password.');
      return;
    }

    
    // Set the URL of the API endpoint
    const url = 'http://localhost:80/changePassword.php'; 
    
    try {
      // Call the API to change the password
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          currentPassword,
          newPassword,
        }),
      });
    
      // Parse the response as JSON
      const data = await response.json();
    
      // Check if the response is successful
      if (response.ok) {
        // Set the message based on the response data
        setMessage(data.message);
      } else {
        // Set a generic error message if the response is not successful
        setMessage('An error occurred while changing the password.');
      }
    } catch (error) {
      // Log and display an error message if an exception occurs during the API call
      console.error('Error changing password:', error);
      setMessage('An error occurred while changing the password.');
    }
  };
  if (!user) {
    return <p>Loading...</p>; // or render a login prompt
  }
  return(
    <div className='acc-set'>
    <h2>Account Settings</h2>
    <p>Hello, {user.username}!</p>

    {/* Display current profile picture */}
    <form onSubmit={handleChangePassword} className={loginStyle.form}>
       <label className={loginStyle.label}>
        Current Password:
        <div className={loginStyle.box} style={{backgroundColor: 'none'}}>
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={loginStyle.input}

          />
          {/* Change the fa-eye-slash if needed */}
          
          <i
            className={`password-toggle fas ${
              showCurrentPassword ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          ></i>
        </div>
      </label>
       <label className={loginStyle.label}>
        New Password:
        <div className={loginStyle.box} style={{backgroundColor: 'none'}}>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={loginStyle.input}
          />
          <i
            className={`password-toggle fas ${
              showNewPassword ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={() => setShowNewPassword(!showNewPassword)}
          ></i>
        </div>
      </label>
       <label className={loginStyle.label}>
        Confirm Password:
        <div className={loginStyle.box} style={{backgroundColor: 'none'}}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={loginStyle.input}

          />
          <i
            className={`password-toggle fas ${
              showConfirmPassword ? "fa-eye-slash" : "fa-eye" 
            }`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>
      </label>
      <br></br>
      <button type="submit" className={buttonStyle.glow_btn}>Change Password</button>
    </form>
    {message && <p>{message}</p>} {/* This returns an error message if any */}

  </div>
  );
};

export default ChangePassword;
  