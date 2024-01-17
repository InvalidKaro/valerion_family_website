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
    <div className="App">
      <main>
        <Hero />
        <Reviews />
        <AofM />
      </main>
    </div>
  );
}

export default Home;
