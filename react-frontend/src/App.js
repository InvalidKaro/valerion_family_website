import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/navbar/header.jsx';
import './styles/header.css';
import './styles/reviews.css';
import Home from './pages/Home.jsx';
import History from './pages/History.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import Family from './pages/Family.jsx';
import Supporters from './pages/Supporters.jsx';
import Help from './pages/Help.jsx';
import Shop from './pages/Shop.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');


  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Header setUser={setUsername} />
          <Routes>
            <Route path="/" element={<Home user={{ username, isUserLoggedIn }} setLoggedIn={setUserLoggedIn} />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login setLoggedIn={setUserLoggedIn} set={setUsername} setProfilePicture={setProfilePicture}/>} />
            <Route path="/signup" element={<Register />} />
            <Route path="/settings" element={<AccountSettings usernames={username}  profilePicture={profilePicture} />} />
            <Route path="/family" element={<Family />} />
            <Route path="/help" element={<Help />} />
            <Route path="/supporters" element={<Supporters />} />
            <Route path="/shop" element={<Shop />} />

          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
