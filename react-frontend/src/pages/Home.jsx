import React from 'react';
import '../styles/App.css';
import Hero from '../hero.js';
import '../styles/hero.css';
import AofM from '../artist-of-mount.js';
import '../styles/artist-of-mount.css';
import Reviews from '../reviews.js';
import '../styles/reviews.css';
import { useUser } from '../UserContext';
import { useAuth } from './auth';

function Home() {
  const { user } = useUser();
  const { loginUser, setUserLoggedIn, navigate } = useAuth();


  return (
    <div className="App">
      <main>
        <Hero />

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

        <Reviews />
        <AofM />
      </main>
    </div>
  );
}

export default Home;
