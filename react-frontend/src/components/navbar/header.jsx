/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";
import logo from "../../images/v-arts-logo.png";
import Login from "../../pages/Login";
import { useAuth } from "../../pages/auth";
import "../../styles/Login.css";
import headerStyles from "../../styles/header.module.css";
import CartPopup from "../Cart/CartPopup";
const Header = () => {
  const { user } = useUser();
  const { isLoggedIn, setUserLoggedOut, navigate } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(""); // Added state for dropdown
  const [isScrolled, setIsScrolled] = useState(false);
  const [LoginModalVisible, setLoginModalVisible] = useState("");
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(""); // State to control cart visibility
  const location = useLocation();

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        // Scrolling down
        setIsScrolled(true);
      } else {
        // Scrolling up
        setIsScrolled(currentScrollY > 300); // Adjust the threshold as needed
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Hide the cart icon if the current location does not contain "/product/"
    if (!location.pathname.includes("/product/")) {
      setCartVisible(false);
      console.log("Cart icon hidden");
    }
  }, [location]);

  const toggleCart = (e) => {
    e.preventDefault();
    setCartVisible(!cartVisible);
  };

  const toggleMenu = (e) => {
    e.preventDefault();

    setMenuVisible(!isMenuVisible);
  };
  const handleBuyClick = (e) => {
    console.log("Buy button clicked");
    e.preventDefault();

    // Add logic to handle the buy button click, e.g., redirect to the purchase page
    navigate("/Shop");
  };

  const handleUserIconClick = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // If not logged in, navigate to login
      setLoginModalVisible(!LoginModalVisible);
      document.body.style.overflow = "hidden";

      console.log("Login modal visible:", LoginModalVisible);
    } else {
      // If logged in, toggle dropdown visibility
      // Get the dropdown menu element
      setDropdownVisible(!dropdownVisible);

      document.addEventListener("DOMContentLoaded", function () {
        // Get the dropdown menu element
        const dropdownMenu = document.querySelector(".dropdown_menu");

        // Function to toggle the 'active' class on the dropdown menu
        function toggleDropdown() {
          dropdownMenu.classList.toggle("active");
        }

        // Get the dropdown button element
        const dropdownButton = document.querySelector(".dropdown_button");

        // Add a click event listener to the dropdown button
        dropdownButton.addEventListener("click", toggleDropdown);
      });
    }
  };

  function getProfilePicture(user) {
    if (user && user.profileData.profileInfo.filename) {
      const Ulogo = `http://localhost:80/${user.profileData.profileInfo.filename}`;
      return { src: Ulogo, isFromDb: true };
    } else {
      const svgString = `<svg width="1200" height="1200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" fill="#0197b2"/>
      <path d="M15.581 16H8.506c-.413 0-.632-.459-.347-.758.847-.889 2.4-2.242 4.008-2.242 1.623 0 3.038 1.38 3.78 2.268.254.304.03.732-.366.732Z" fill="#0197b2" stroke="#0197b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="10" stroke="#0197b2" stroke-width="2"/>
    </svg>`;
      const Ulogo = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
      return { src: Ulogo, isFromDb: false };
    }
  }
  const handleLogout = () => {
    setUserLoggedOut();
    // Add logic to handle logout, e.g., redirect to the login page
  };
  return (
    <main>
      {isMenuVisible && (
        <div className={headerStyles.menuContainer}>
          <ul className={headerStyles.menu}>
            <li>
              <a href="../about">About us</a>
            </li>
            <li>
              <a href="../Supporters">Supporters</a>
            </li>
            <li>
              <a href="../Shop">Market</a>
            </li>
            <li>
              <a href="../frequently-asked-questions">FAQ's</a>
            </li>
            <li>
              <a href="../Help">Need Help?</a>
            </li>
          </ul>
        </div>
      )}
      <div className={headerStyles.boxHeader}>
        <header
          className={`${headerStyles.header} ${
            isScrolled ? headerStyles.hidden : ""
          }`}
        >
          <a href="/">
            <img src={logo} alt="logo" className={headerStyles.header__logo} />
          </a>
          <nav>
            <ul className={headerStyles.header__menu}>
              <li className={headerStyles.header__link}>
                <a href="../about">About us</a>
              </li>
              <li className={headerStyles.header__link}>
                <a href="../Supporters">Supporters</a>
              </li>
              <li className={headerStyles.header__link}>
                <div className={headerStyles.trapezoid}>
                  <svg
                    width="300"
                    height="75"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <polygon
                      points="50,10 250,10 220,70 80,70"
                      fill="#058AA3"
                      filter="url(#glow)"
                    />
                    <a href="../Shop">
                      <text
                        x="150"
                        y="40"
                        dominant-baseline="middle"
                        text-anchor="middle"
                        fill="white"
                        class={headerStyles.market_text}
                      >
                        Market
                      </text>
                    </a>
                  </svg>
                </div>
              </li>
              <li className={headerStyles.header__link}>
                <a href="../frequently-asked-questions">FAQ's</a>
              </li>
              <li className={headerStyles.header__link}>
                <a href="../Help">Need Help?</a>
              </li>
            </ul>
          </nav>

          <div className={headerStyles.header__rsection}>
            <button
              className={headerStyles.buy_button}
              type="button"
              onClick={handleBuyClick}
            >
              BUY
            </button>

            <div className={headerStyles.header__user__section}>
              <a
                href="#"
                onClick={handleUserIconClick}
                className={headerStyles.user_icon}
              >
                <img
                  src={getProfilePicture(user).src}
                  alt="userLogo"
                  className={headerStyles.header__user__icon}
                  style={
                    getProfilePicture(user).isFromDb
                      ? {}
                      : { alignContent: "center", alignItems: "center" }
                  }
                  onClick={handleUserIconClick}
                />
              </a>
            </div>
            {location.pathname.includes("/product/") && (
              <div className="cart">
                <img
                  src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 12.46a2 2 0 0 0 2 1.54h9.72a2 2 0 0 0 2-1.54L23 6H6"></path></svg>`}
                  alt="Cart"
                  width="24"
                  height="24"
                  onClick={toggleCart}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
            <div className={headerStyles.hamburger_button} onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>
        </header>
        {isLoggedIn && dropdownVisible && (
          <div
            className={`${headerStyles.dropdown_menu} ${
              dropdownVisible ? "active" : ""
            }`}
            id="dropdown"
          >
            <div className={headerStyles.dropdown}>
              <button
                id="dropdown_button"
                className={headerStyles.dropdown_button}
                onClick={() => {
                  navigate(`/user/${user.username}`);
                  setDropdownVisible(false);
                }}
              >
                Profile
              </button>
              <button
                className={headerStyles.dropdown_button}
                onClick={() => {
                  navigate("/Settings");
                  setDropdownVisible(false);
                }}
              >
                Settings
              </button>
              <button
                className={headerStyles.dropdown_button}
                onClick={() => {
                  handleLogout();
                  setDropdownVisible(false);
                }}
              >
                Logout
              </button>{" "}
            </div>
          </div>
        )}
      </div>
      {LoginModalVisible && (
        <Login setLoginModalVisible={setLoginModalVisible} />
      )}
      {cartVisible && <CartPopup onClose={toggleCart} />}
    </main>
  );
};

export default Header;
