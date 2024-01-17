import React, { useState } from 'react';
import { useUser } from '../../UserContext.js';
import '../../styles/settings.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ChangeProfile = () => {
  const { user, loginUser } = useUser(); // Use the useUser hook here
  const [message, setMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const fetchProfilePicture = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:80/checkProfilePicture.php';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.username }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log({ ...data})
        if (data.success) {
          // Include profile picture data when calling loginUser
          // get the filename and check if it has no "profile_pictures/" prefix, if it doesn't, add it
          if (!data.filename.startsWith('profile_pictures/')) {
            data.filename = 'profile_pictures/' + data.filename;
          }
          setProfilePicture({
            url: data.filename,
            fileType: data.fileType,
        });
          loginUser({
            ...user,
            profilePicture: {
              url: data.filename,
              fileType: data.fileType,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    } finally {
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
          if (!data.filename.startsWith('profile_pictures/')) {
            data.filename = 'profile_pictures/' + data.filename;
          }
          loginUser({ ...user, profileData: {profileInfo: {filetype: data.fileType, filename: data.filename}} });
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
  
  // Removed 'user' from the dependency array
  
  /*
  Add static image bc logout will clear local storage
    */


  // Check if the user is logged in
  if (!user) {
    return <p>Please log in to view account settings.</p>;
  }

  return(
    <div className='acc-set'>
    <h2>Account Settings</h2>
    <p>Hello, {user.username}!</p>

    {/* Display current profile picture */}
    
    {user.profileData && (
      <div className="current-profile-picture">
        <p>File Type: {user.profileData.profileInfo.filetype}</p>
        <p>URL: {user.profileData.profileInfo.filename}</p>
        {console.log(user.profileData.url)}
        {['gif', 'jpg', 'jpeg', 'png'].includes(user.profileData.profileInfo.filetype) ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={`http://localhost:80/${user.profileData.profileInfo.filename}`}
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