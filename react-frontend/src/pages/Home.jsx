import React from 'react';
import './styles/App.css';
import Hero from './hero.js'
import './styles/hero.css';
import AofM from './artist-of-mount.js';
import './styles/artist-of-mount.css';
import Reviews from './reviews.js';
import './styles/reviews.css';

function Home() {
  return (
    <div className="App">
      <main>
        <Hero/>
        <Reviews/>
        <AofM/>
      </main>
    </div>
  );
}

export default Home;
