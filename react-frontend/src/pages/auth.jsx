// auth.js
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const { loginUser: contextLoginUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Memoize the contextLoginUser function
  const memoizedContextLoginUser = useCallback(contextLoginUser, [contextLoginUser]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log('Stored User:', storedUser);

      if (storedUser) {
        memoizedContextLoginUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
        console.log('User Logged In:', JSON.parse(storedUser));

        // Fetch profile picture data here and update the state
        // Assuming you have a function fetchProfileData(username)
        // const profileData = fetchProfileData(JSON.parse(storedUser).username);
        // setProfileData(profileData);
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }
  }, []);

  const saveUserInContext = (userData) => {
    memoizedContextLoginUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);

    // Fetch and set profile picture data
    // Assuming you have a function fetchProfileData(username)
    // const profileData = fetchProfileData(userData.username);
    // setProfileData(profileData);
  };

  const setUserLoggedOut = () => {
    memoizedContextLoginUser(null);
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setProfileData(null); // Clear profile data on logout
  };

  const loginUser = (data) => {
    saveUserInContext(data);

    navigate('/');
  };

  return {
    isLoggedIn,
    loginUser,
    setUserLoggedOut,
    navigate,
    profileData,
  };
};
