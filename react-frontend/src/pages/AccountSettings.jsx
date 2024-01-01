// AccountSettings.js
import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { useAuth } from './auth';

const AccountSettings = () => {
  const { user } = useUser();
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Add logic to check if currentPassword is correct
    // and if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    // Assuming you have an API endpoint to change the password
    try {
      // Call the API to change the password
      await changePassword({
        username: user.username,
        currentPassword,
        newPassword,
      });

      setMessage('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('An error occurred while changing the password.');
    }
  };

  // If user is not present, display a loading or login prompt
  if (!user) {
    return <p>Loading...</p>; // or render a login prompt
  }

  return (
    <div>
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
