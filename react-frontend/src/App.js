import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";

import CookiePopup from "./components/Cookies.jsx";
import Header from "./components/navbar/header.jsx";
import TermsOfUse from "./documents/termsOfUse.jsx";
import "./styles/App.css";

const LazyComponents = {
  PdfView: lazy(() => import("./components/FileHandling/test.jsx")),
  PayPal: lazy(() => import("./components/payment/paypal.jsx")),
  TestPage: lazy(() => import("./functions/Test.jsx")),
  DocTitle: lazy(() => import("./functions/docTitle.jsx")),
  About: lazy(() => import("./pages/About.jsx")),
  AccountSettings: lazy(() => import("./pages/AccountSettings.jsx")),
  Admin: lazy(() => import("./pages/Admin.jsx")),
  Art: lazy(() => import("./pages/Art.jsx")),
  Family: lazy(() => import("./pages/Family.jsx")),
  Help: lazy(() => import("./pages/Help.jsx")),
  Home: lazy(() => import("./pages/Home.jsx")),
  Login: lazy(() => import("./pages/Login.jsx")),
  Register: lazy(() => import("./pages/Register.jsx")),
  Shop: lazy(() => import("./pages/Shop.jsx")),
  Supporters: lazy(() => import("./pages/Supporters.jsx")),
  UserPage: lazy(() => import("./pages/User.jsx")),
  ForgotPassword: lazy(() => import("./pages/forgotPassword.jsx")),
  ProductDetail: lazy(() => import("./pages/productDetail.jsx")),
};

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
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <LazyComponents.DocTitle title="Home Page" />
                    <LazyComponents.Home
                      user={{ username, isUserLoggedIn }}
                      setLoggedIn={setUserLoggedIn}
                      isUserLoggedIn={isUserLoggedIn}
                    />
                  </>
                }
              />
              <Route path="/about" element={<LazyComponents.About />} />
              <Route
                path="/login"
                element={
                  <LazyComponents.Login
                    setLoggedIn={setUserLoggedIn}
                    set={setUsername}
                    setProfilePicture={setProfilePicture}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <LazyComponents.Register
                    setLoggedIn={setUserLoggedIn}
                    set={setUsername}
                    setProfilePicture={setProfilePicture}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <LazyComponents.AccountSettings
                    usernames={username}
                    profilePicture={profilePicture}
                  />
                }
              />
              <Route path="/family" element={<LazyComponents.Family />} />
              <Route path="/help" element={<LazyComponents.Help />} />
              <Route
                path="/supporters"
                element={<LazyComponents.Supporters />}
              />
              <Route
                path="/shop"
                element={<LazyComponents.Shop isUserLoggedIn={isUserLoggedIn} />}
              />
              <Route
                path="/upload"
                element={
                  <LazyComponents.Art
                    username={username}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                }
              />
              <Route
                path="/product/:productId"
                element={<LazyComponents.ProductDetail />}
              />
              <Route
                path="/user/:username"
                element={<LazyComponents.UserPage username={username} />}
              />
              <Route path="/admin" element={<LazyComponents.Admin />} />
              <Route
                path="/forgotPassword"
                element={<LazyComponents.ForgotPassword />}
              />
              <Route path="/test" element={<LazyComponents.TestPage />} />
              <Route
                path="/payment"
                element={<LazyComponents.PayPal isUserLoggedIn={isUserLoggedIn} />}
              />
              <Route path="/pdf" element={<LazyComponents.PdfView />} />
              <Route path="/terms_of_use" element={<TermsOfUse />} />
            </Routes>
          </Suspense>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
