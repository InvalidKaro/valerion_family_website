import React, { useState } from 'react';
import { useUser } from '../../UserContext.js';
import '../../styles/settings.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ChangeProfile = () => {
  const { user, loginUser, logoutUser } = useUser(); // Use the useUser hook here
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

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
  
    // Check the file size
    const maxSize = 3.5 * 1024 * 1024; // 3.5MB in bytes
    if (file.size > maxSize) {
        setMessage('File size exceeds the maximum limit of 3.5MB.');
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
  

  /*
  Add static image bc logout will clear local storage
    */

  if (!user) {
    return <p>Loading...</p>; // or render a login prompt
  }
  return(
    <div className='acc-set'>
    <h2>Account Settings</h2>
    <p>Hello, {user.username}!</p>

    {/* Display current profile picture */}
    
    {user.profilePicture && (
      <div className="current-profile-picture">
        <p>File Type: {user.profilePicture.fileType}</p>
        <p>URL: {user.profilePicture.url}</p>
        {console.log(user.profilePicture.url)}
        {['gif', 'jpg', 'jpeg', 'png'].includes(user.profilePicture.fileType) ? (
          <img
            src={`http://localhost:80/${user.profilePicture.url}`}
            alt="Profile Picture"
            style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        ) : (
          <span>Unsupported file type</span>
        )}
      </div>
    )}


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

export default ChangeProfile;