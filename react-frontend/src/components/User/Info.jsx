import React, { useState, useEffect } from 'react';
import '../../styles/userinfo.css';

const UserInfo = () => {
  const [userx, setUserx] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = 'Karo';
        const response = await fetch(`http://localhost:80/userInfo.php?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();

        // Capitalize the first letter of each word in the roles property
        const capitalizedRoles = data.roles.map(role => {
          return role.replace(/\b\w/g, char => char.toUpperCase());
        });
        const capitalizedBadges = data.badges.map(badge => {
            return {
              ...badge,
              name: badge.name.replace(/\b\w/g, char => char.toUpperCase())
            };
          });

        // Update the userx object with the capitalized roles
        const updatedUserx = { ...data, roles: capitalizedRoles, badges: capitalizedBadges };
        setUserx(updatedUserx);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (!userx) {
    return <p>No user information available</p>;
  }

  return (
    <div className='user_section'>
      <h2>User Information</h2>
      <div className='user_info_section'>
        <p>Username: {userx.username}</p>
      </div>
      {userx.profile_picture ? (
        // Display the profile picture
        <div className='profile_picture_section'>
          <p>Profile Picture:</p>
          <img src={`http://localhost:80/profile_pictures/${userx.profile_picture.filename}`} alt={`Profile of ${userx.username}`} className='pfp' /> {/* Display the profile picture */}
        </div>
      ) : (
        <p className='profile_picture'>{userx.profile_picture}</p>
      )}
      <div className='badges_section'>
        <p>Badges:</p>
        <ul className='badge_list'>
            {userx.badges.map((badge, index) => (
            <li key={index} className='badge_list'>
                <div className='badge-container'>
                <img src={`${badge.url}`} alt={`Badge ${badge.name}`} className='badge' />
                <span className='badge-name-tooltip'>{badge.name}</span>
                </div>
            </li>
            ))}
        </ul>
        </div>
      {userx ? (
        <div className='user_info'>
          <p className='registration_date'>Registration Date: {userx.formatted_registration_date}</p>
          {userx.roles ? (
            <div className='roles_section'>
              <p className='roles'>Roles:</p>
              <ul>
                {userx.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{userx.roles}</p>
          )}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default UserInfo;