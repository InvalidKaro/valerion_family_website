import React, { useState } from 'react';
import '../styles/App.css';
import { useUser } from '../UserContext';
import UsersDashboard from '../components/Admin/users';
function Admin() {
  const { user } = useUser();
  const [isUserLoggedIn] = useState('')

  return (
    <div className="Admin">
        
        <UsersDashboard isUserLoggedIn={isUserLoggedIn}></UsersDashboard>
      <main>
        {user && user.username ? ( // Check if user and username exist
          <div>
            <h1>Welcome, {user.username}!</h1>
            {/* Add more user information if needed */}
          </div>
        ) : (
          <div>
            <h1>Welcome!</h1>
          </div>
        )}

      </main>
    </div>
  );
}

export default Admin;
