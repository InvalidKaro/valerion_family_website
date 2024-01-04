import React, { useState } from 'react';
import { useUser } from '../UserContext';
import '../styles/settings.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AccountSettings = () => {
  const { user } = useUser();
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
   
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
  
    
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
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('An error occurred while changing the password.');
      }
    } catch (error) {
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

    <form onSubmit={handleChangePassword}>
      <label>
        Current Password:
        <div className="password-input-container">
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
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
      <label>
        New Password:
        <div className="password-input-container">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <i
            className={`password-toggle fas ${
              showNewPassword ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={() => setShowNewPassword(!showNewPassword)}
          ></i>
        </div>
      </label>
      <label>
        Confirm Password:
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
      <button type="submit">Change Password</button>
    </form>
    {message && <p>{message}</p>} {/* This returns an error message if any */}
  </div>
  );
};

export default AccountSettings;