import React from 'react';
import './styles/App.css';
import Header from './components/navbar/header.js';
import './styles/header.css';
import Hero from './hero.js'
import './styles/hero.css';
import AofM from './artist-of-mount.js';
import './styles/artist-of-mount.css';
import Reviews from './reviews.js';
import './styles/reviews.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home.jsx'




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

export default App;
