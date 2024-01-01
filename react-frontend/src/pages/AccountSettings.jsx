// AccountSettings.js
import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { useAuth } from './auth';
import '../styles/settings.css';


//Maybe make this components
const AccountSettings = () => {
  const { user } = useUser();
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
    // Add logic to check if currentPassword is correct
    // You need to replace 'checkCurrentPasswordApi' with the actual API endpoint to verify the current password
    try {
      const response = await fetch('http://localhost:80/CheckPassword.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.username, password: currentPassword }),
      });
  
      const data = await response.json();
  
      if (!data.success) {
        setMessage('Current password is incorrect.');
        return;
      }
    } catch (error) {
      console.error('Error checking current password:', error);
      setMessage('An error occurred while checking the current password.');
      return;
    }
  
    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
  
    // Assuming you have an API endpoint to change the password
    try {
      // Call the API to change the password
      const changePasswordResponse = await fetch('http://localhost:80/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: currentPassword,
          newPassword,
        }),
      });
  
      const changePasswordData = await changePasswordResponse.json();
  
      if (changePasswordData.success) {
        setMessage('Password changed successfully!');
      } else {
        setMessage('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('An error occurred while changing the password.');
    }
  };
  

  return (
    <div className='acc-set'>
      <h2>Account Settings</h2>
      <p>Hello, {user.username}!</p>

      <form onSubmit={handleChangePassword}>
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountSettings;
