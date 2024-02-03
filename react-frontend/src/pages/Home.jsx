import React from 'react';
import { useUser } from '../UserContext';
import Flyout from '../components/Flyout.jsx';
import AofM from '../components/Home/artist-of-mount.js';
import Hero from '../components/Home/hero.js';
import Reviews from '../components/Home/reviews.js';
import '../styles/App.css';
import '../styles/artist-of-mount.css';
function Home() {
  const { user } = useUser();
  document.title = "Home";
  return (
    <div className="App">
      <main>
        <Hero />
        {user && user.username && <Flyout user={user.username} duration={3000} />}
        <Reviews isLoggedIn={user && user.username}/>
        <AofM />
      </main>
    </div>
  );
}

export default Home;
