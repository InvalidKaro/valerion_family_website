import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import CookiePopup from "./components/Cookies.jsx";
import Header from "./components/navbar/header.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import Admin from "./pages/Admin.jsx";
import Art from "./pages/Art.jsx";
import Family from "./pages/Family.jsx";
import Help from "./pages/Help.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shop from "./pages/Shop.jsx";
import Supporters from "./pages/Supporters.jsx";
import UserPage from "./pages/User.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import ProductDetail from "./pages/productDetail.jsx"; // Import the ProductDetail component
import TestPage from "./pages/productTest.jsx";
import "./styles/App.css";
import "./styles/header.css";
import "./styles/reviews.css";
function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [showCookiePopup] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 500;
      const winScroll = window.pageYOffset;
      setHeight(winScroll);
      setIsVisible(winScroll <= heightToHideFrom);
    };

    window.addEventListener("scroll", listenToScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {showCookiePopup && <CookiePopup />}
      <UserProvider>
        <Router>
          <Header setUser={setUsername} isVisible={isVisible} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={{ username, isUserLoggedIn }}
                  setLoggedIn={setUserLoggedIn}
                  isUserLoggedIn={isUserLoggedIn}
                />
              }
            />
            <Route path="/history" element={<History />} />
            <Route
              path="/login"
              element={
                <Login
                  setLoggedIn={setUserLoggedIn}
                  set={setUsername}
                  setProfilePicture={setProfilePicture}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  setLoggedIn={setUserLoggedIn}
                  set={setUsername}
                  setProfilePicture={setProfilePicture}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <AccountSettings
                  usernames={username}
                  profilePicture={profilePicture}
                />
              }
            />
            <Route path="/family" element={<Family />} />
            <Route path="/help" element={<Help />} />
            <Route path="/supporters" element={<Supporters />} />
            <Route
              path="/shop"
              element={<Shop isUserLoggedIn={isUserLoggedIn} />}
            />
            <Route
              path="/upload"
              element={
                <Art username={username} isUserLoggedIn={isUserLoggedIn} />
              }
            />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route
              path="/user/:username"
              element={<UserPage username={username} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
