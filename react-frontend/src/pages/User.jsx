import React, { useState } from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom";
import UserInfo from '../components/User/Info';
import UserProducts from '../components/User/Products';
import ReviewDetail from '../components/User/Reviews';
import  userMount from '../functions/mount.js';
import { useUser } from '../UserContext.js';
import UserAdmin from '../components/User/Admin.jsx';
function UserPage() {
    const { user } = useUser();
    const { username } = useState();
  return (
      <main>
            <UserInfo username={username}/>
            <UserProducts />
            <ReviewDetail />
            <UserAdmin username={username}/>
      </main>
    
  );
}

export default UserPage;
