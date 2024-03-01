import "./Footer.css"; // Import CSS file for styling
const Footer = () => {
  return (
    <footer className="footer" style={{textAlign: "center"}}>
      <div className="footer__top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h4>About Us</h4>
              <p>
              V-Arts is a platform, specifically a website 
              which is a Marketplace for AI generated content
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
                <li>Austria</li>
                <li>Email: info@v-arts.shop</li>
                <li>Phone: +123 456 7890</li>
              </ul>
              <ul className="col-md-3 col-sm-6" style={{ display: 'inline-flex', gap: '1rem', justifyContent: 'center'}}>
                <li>
                  <a href="/terms_of_use" className="termsetc">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="termsetc">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="termsetc">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="termsetc">
                    Returns
                  </a>
                </li>
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
                    <i class="fa-brands fa-x-twitter"></i>
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
                <li>
                  <a href="https://discord.gg/wdjpUt4rdY">
                    <i className="fab fa-discord"></i>
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
                &copy; {new Date().getFullYear()} V-Arts. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
