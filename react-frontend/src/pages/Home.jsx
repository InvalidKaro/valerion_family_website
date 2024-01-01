import React from 'react';
import '../styles/App.css';
import Hero from '../hero.js'
import '../styles/hero.css';
import AofM from '../artist-of-mount.js';
import '../styles/artist-of-mount.css';
import Reviews from '../reviews.js';
import '../styles/reviews.css';
import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <div className="App">
      <main>
      <Hero/>
        {user && (
            <div>
              <h1>Welcome, {user.username}!</h1>
              {/* Add more user information if needed */}
            </div>
          )}
        
        <Reviews/>
        <AofM/>
      </main>
    </div>
  );
}

export default Home;
