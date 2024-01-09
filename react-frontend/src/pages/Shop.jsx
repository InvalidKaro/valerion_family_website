import React from 'react';
import '../styles/App.css';
import Hero from '../components/Home/hero.js';
import '../styles/hero.css';
import AofM from '../components/Home/artist-of-mount.js';
import '../styles/artist-of-mount.css';
import Reviews from '../components/Home/reviews.js';
import '../styles/reviews.css';
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
