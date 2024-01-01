// auth.js
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const { loginUser: contextLoginUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Memoize the contextLoginUser function
  const memoizedContextLoginUser = useCallback(contextLoginUser, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log('Stored User:', storedUser);
  
      if (storedUser) {
        memoizedContextLoginUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
        console.log('User Logged In:', JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }
  }, [memoizedContextLoginUser]);
  

  const saveUsernameInContext = (username) => {
    memoizedContextLoginUser({ username });
    localStorage.setItem('user', JSON.stringify({ username }));
    setIsLoggedIn(true);
  };

  const setUserLoggedOut = () => {
    memoizedContextLoginUser(null);
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const loginUser = (data) => {
    saveUsernameInContext(data.username);
    navigate('/');
  };

  return {
    isLoggedIn,
    loginUser,
    setUserLoggedOut,
    navigate,
  };
};
