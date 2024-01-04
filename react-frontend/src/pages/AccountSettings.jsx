import React, { useState } from 'react';
import { useUser } from '../UserContext';
import '../styles/settings.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AccountSettings = () => {
  const { user, loginUser, logoutUser } = useUser(); // Use the useUser hook here
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


  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('#fileInput');
    const file = fileInput.files[0];
  
    // Check if a file was selected
    if (!file) {
      setMessage('Please select a profile picture to upload.');
      return;
    }
  
    // Check if the file type is supported (gif, png, or jpg)
    const allowedFileTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedFileTypes.includes(file.type)) {
      setMessage('Invalid file type. Please select a GIF, PNG, JPG or JPEG image.');
      return;
    }
  
    // Set the URL of the API endpoint
    const url = 'http://localhost:80/storePFP.php';
  
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('profilePicture', file);
  
      // Call the API to upload the profile picture
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Check if the response is successful
      if (response.ok) {
        // Set the message based on the response data
        setMessage(data.message);

        // If the upload was successful, update the user context with the new profile picture URL
        if (data.success) {
          loginUser({ ...user, profilePicture: { url: data.url, fileType: data.fileType} });
        }
        console.log(user)
      } else {
        // Set the error message from the response
        setMessage(data.message || 'An error occurred while uploading the profile picture.');
      }
    } catch (error) {
      // Log and display a generic error message if an exception occurs during the API call
      console.error('Error uploading profile picture:', error);
      setMessage('An error occurred while uploading the profile picture.');
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
    {/* Display current profile picture */}
    
    {user.profilePicture && (
      <div className="current-profile-picture">
        <p>File Type: {user.profilePicture.fileType}</p>
        <p>URL: {user.profilePicture.url}</p>
        {['gif', 'jpg', 'jpeg', 'png'].includes(user.profilePicture.fileType) ? (
          <img
            src={`http://localhost:80${user.profilePicture.url}`}
            alt="Profile Picture"
            style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        ) : (
          <span>Unsupported file type</span>
        )}
      </div>
    )}


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

     {/* Upload profile picture */}
    <form onSubmit={handleProfilePictureUpload}>
      <label>
        Select Profile Picture:
        <input
          type="file"
          accept="image/gif, image/png, image/jpeg, image/jpg"
          id="fileInput"
          name="profilePicture"
        />
      </label>
      <button type="submit">Upload</button>
    </form>

  </div>
  );
};

export default AccountSettings;