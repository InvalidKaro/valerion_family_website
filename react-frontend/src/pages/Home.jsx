import React from "react";
import { Fade } from "react-awesome-reveal";
import { useUser } from "../UserContext";
import ScrollToTopButton from "../components/BackToTop/topButton.jsx";
import Flyout from "../components/Flyout.jsx";
import Footer from "../components/Footer/commonFooter.jsx";
import AofM from "../components/Home/artist-of-mount.js";
import Hero from "../components/Home/hero.js";
import Reviews from "../components/Home/reviews.js";
import WhySection from "../components/Home/whySection.jsx";
import "../styles/App.css";
import "../styles/artist-of-mount.css";
function Home() {
  const { user } = useUser();
  return (
    <div className="App" style={{ scrollBehavior: "smooth" }}>
      <main style={{ scrollBehavior: "smooth" }}>
        <Hero />
        {user && user.username && (
          <Flyout user={user.username} duration={3000} />
        )}
        <Fade>
          <WhySection/>
        </Fade>
          <Reviews isLoggedIn={user && user.username} />
        <Fade direction="up">
          <AofM />
        </Fade>
      </main>
        <Footer />
      <ScrollToTopButton />
    </div>
    
  );
}

export default Home;
