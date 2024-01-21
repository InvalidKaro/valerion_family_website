// UserAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext';

const UserAdmin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:80/userRole.php?username=${user.username}`); // Replace with the actual URL to fetch user info
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserInfo();

  }, [user]); // Add user.username as a dependency to re-fetch user info when the username changes

  return (
    <div className='admin_section'>

<br></br>
<br></br>
<br></br>
<br></br>
      <h2>User Information</h2>
      
      {userInfo === 'admin' || userInfo === 'developer' ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Role: {userInfo}</p>
          {/* Add more user information here */}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default UserAdmin;