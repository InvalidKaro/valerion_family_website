// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} children - The children elements.
 * @return {JSX.Element} - The JSX element.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => { 
    /* 
    Check localStorage on component mount (page load)
    and setting the user state if there is a stored user value.
    */
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log("Stored", JSON.parse(storedUser))
      setUser(JSON.parse(storedUser));
      console.log(user)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    /**
   * Sets the user data and saves it to localStorage for persistence.
   *
   * @param {Object} userData - The user data to be set.
   */
  const loginUser = (userData) => {
    setUser(userData);
    // Save to localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logs out the current user by removing their information from the local storage.
  const logoutUser = () => {
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Returns the user context from the UserContext.
 *
 * @return {Object} The user context.
 * @throws {Error} Throws an error if used outside of a UserProvider.
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }console.log(context)
  return context;
  
};
