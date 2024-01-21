import React from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom";
import UserInfo from '../components/User/Info';
import UserProducts from '../components/User/Products';
import ReviewDetail from '../components/User/Reviews';
function UserPage() {
  return (
      <main>
            <UserInfo />
            <UserProducts />
            <ReviewDetail />
      </main>
    
  );
}

export default UserPage;
