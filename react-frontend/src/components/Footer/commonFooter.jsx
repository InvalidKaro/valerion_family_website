import React from 'react';
import './Footer.css'; // Import CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h4>About Us</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4>Contact Info</h4>
              <ul>
                <li>123 Main Street, City</li>
                <li>Email: info@example.com</li>
                <li>Phone: +123 456 7890</li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4>Follow Us</h4>
              <ul className="social-icons">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>
                &copy; {new Date().getFullYear()} V-Arts. All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6">
              <p className="text-right">Designed by Invalid Karo</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
