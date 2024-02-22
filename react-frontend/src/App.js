import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";

import CookiePopup from "./components/Cookies.jsx";
import PdfView from "./components/FileHandling/test.jsx";
import Header from "./components/navbar/header.jsx";
import PayPal from "./components/payment/paypal.jsx";
import TermsOfUse from "./documents/termsOfUse.jsx";
import TestPage from "./functions/Test.jsx";
import DocTitle from "./functions/docTitle.jsx";
import About from "./pages/About.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import Admin from "./pages/Admin.jsx";
import Art from "./pages/Art.jsx";
import Family from "./pages/Family.jsx";
import Help from "./pages/Help.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shop from "./pages/Shop.jsx";
import Supporters from "./pages/Supporters.jsx";
import UserPage from "./pages/User.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import ProductDetail from "./pages/productDetail.jsx"; // Import the ProductDetail component
import "./styles/App.css";

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [showCookiePopup] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 500;
      const winScroll = window.scrollY;
      setHeight(winScroll);
      setIsVisible(winScroll <= heightToHideFrom);
    };

    window.addEventListener("scroll", listenToScroll);

    const docTitle = document.title;
    const onBlur = () => {
      document.title = "Come back 🙁";
    };
    const onFocus = () => {
      document.title = docTitle;
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    // Clean up the event listeners when the component is unmounted
    return () => {
      window.removeEventListener("scroll", listenToScroll);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
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
                <DocTitle title="Home Page" /> && (
                  <Home
                    user={{ username, isUserLoggedIn }}
                    setLoggedIn={setUserLoggedIn}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                )
              }
            />
            <Route path="/about" element={<About />} />
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
            <Route
              path="/payment"
              element={<PayPal isUserLoggedIn={isUserLoggedIn} />}
            />
            <Route path="/pdf" element={<PdfView />} />
            <Route path="/terms_of_use" element={<TermsOfUse />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
