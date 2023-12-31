import React from 'react';
import './styles/App.css';
import Header from './header';
import './styles/header.css';
import Hero from './hero.js'
import './styles/hero.css';
import AofM from './artist-of-mount.js';
import './styles/artist-of-mount.css';
import Reviews from './reviews.js';
import './styles/reviews.css';
import { Routes, Route } from 'react-router-dom'


/*
function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Hero/>
        <Reviews/>
        <AofM/>
      </main>
    </div>
  );
}
*/

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<App />}></Route>
      </Routes>
      <Header />
      <main>
        <Hero />
        <Reviews />
        <AofM />
      </main>
    </div>
  );
};
export default App;
