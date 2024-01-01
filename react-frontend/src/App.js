import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/navbar/header.js';
import './styles/header.css';
import Hero from './hero.js'
import './styles/hero.css';
import AofM from './artist-of-mount.js';
import './styles/artist-of-mount.css';
import Reviews from './reviews.js';
import './styles/reviews.css';
import Home from './pages/Home.jsx';
import History from "./pages/History.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './UserContext';





function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null); // Add user state


  // Check for user login status when the app starts
  useEffect(() => {
    const isUserLoggedIn = document.cookie.includes('isUserLoggedIn=true');
  });

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Header setUser={setUser} />
              <Routes>
                  <Route path="/" element={<Home username={username} loggedIn={isUserLoggedIn} setLoggedIn={setUserLoggedIn}/>} />
                  <Route
                      path="/History"
                      element={<History />}
                  />
                  <Route path="/login" element={<Login setLoggedIn={setUserLoggedIn} set={setUsername} />} />
                  <Route
                      path="/Signup"
                      element={<Register />}
                  />
              </Routes>
          </Router>
        </UserProvider>
    </div>
  );
}

export default App;
