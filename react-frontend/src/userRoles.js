// useFetchUserInfo.js
import { useState, useEffect } from "react";
const useFetchUserInfo = (username) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (username) {
      const fetchUserInfo = async () => {
        try {
          // Your async code here
        } catch (error) {
          // Handle the error
        }
      };
      fetchUserInfo();
    }
  }, [username]);
  return userInfo; // Add this line to return the userInfo state
};

export default useFetchUserInfo;
