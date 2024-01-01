// auth.js
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { useState } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const { loginUser: contextLoginUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveUsernameInContext = (username) => {
    contextLoginUser({ username });
  };

  const setUserLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const loginUser = async (data) => {
    saveUsernameInContext(data.username);
    setUserLoggedIn(true);

    // Add a delay before navigating to ensure the context is updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    navigate('/');
  };

  return {
    loginUser,
    setUserLoggedIn,
    navigate,
  };
};
