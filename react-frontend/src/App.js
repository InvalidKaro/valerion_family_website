import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/navbar/header.jsx';
import './styles/header.css';
import Hero from './components/Home/hero.js';
import './styles/hero.css';
import AofM from './components/Home/artist-of-mount.js';
import './styles/artist-of-mount.css';
import Reviews from './components/Home/reviews.js';
import './styles/reviews.css';
import Home from './pages/Home.jsx';
import History from './pages/History.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import Family from './pages/Family.jsx';
import Supporters from './pages/Supporters.jsx';
import Help from './pages/Help.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check for user login status when the app starts
  useEffect(() => {
    const isUserLoggedIn = document.cookie.includes('isUserLoggedIn=true');
    setUserLoggedIn(isUserLoggedIn); // Update the state
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Header setUser={setUsername} />
          <Routes>
            <Route path="/" element={<Home user={{ username, isUserLoggedIn }} setLoggedIn={setUserLoggedIn} />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login setLoggedIn={setUserLoggedIn} set={setUsername} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/settings" element={<AccountSettings usernames={username} />} />
            <Route path="/family" element={<Family />} />
            <Route path="/help" element={<Help />} />
            <Route path="/supporters" element={<Supporters />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
