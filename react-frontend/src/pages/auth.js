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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      memoizedContextLoginUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
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
