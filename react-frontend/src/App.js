import React, { useState, useEffect } from 'react';
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
import Art from './pages/Art.jsx';
import CookiePopup from './components/Cookies.jsx';
import ProductDetail from './pages/productDetail.jsx'; // Import the ProductDetail component
import UserPage from './pages/User.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import UserAdmin from './components/User/Admin.jsx';
import Admin from './pages/Admin.jsx';
import ForgotPassword from './pages/forgotPassword.jsx';

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [showCookiePopup, setShowCookiePopup] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 500;
      const winScroll = window.pageYOffset;
      setHeight(winScroll);
      setIsVisible(winScroll <= heightToHideFrom);
      console.log(winScroll);
      console.log(winScroll <= heightToHideFrom); // Check if this logs the expected value

    };

    window.addEventListener('scroll', listenToScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  return (
    <div className="App">

    {showCookiePopup && (
        <CookiePopup />
      )}
      <UserProvider>
        <Router>
          <Header setUser={setUsername} isVisible={isVisible} />
          <Routes>
            <Route path="/" element={<Home user={{ username, isUserLoggedIn }} setLoggedIn={setUserLoggedIn} />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login setLoggedIn={setUserLoggedIn} set={setUsername} setProfilePicture={setProfilePicture} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/settings" element={<AccountSettings usernames={username} profilePicture={profilePicture} />} />
            <Route path="/family" element={<Family />} />
            <Route path="/help" element={<Help />} />
            <Route path="/supporters" element={<Supporters />} />
            <Route path="/shop" element={<Shop isUserLoggedIn={isUserLoggedIn} />} />
            <Route path="/upload" element={<Art username={username} isUserLoggedIn={isUserLoggedIn} />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/user/:username" element={<UserPage username={username}/>} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
          </Routes>
        </Router>

      </UserProvider>
    </div>
  );
}

export default App;