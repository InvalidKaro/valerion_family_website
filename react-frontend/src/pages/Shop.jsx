import React from 'react';
import '../styles/App.css';
import { useUser } from '../UserContext';

function Home() {
  const { user } = useUser();


  return (
    <div className="Shop">
        <head>
          <title>Shop</title>
        </head>
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

export default Home;
