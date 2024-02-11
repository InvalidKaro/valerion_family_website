import React, { useEffect, useState } from "react";
import styles from "../styles/about.module.css";

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        // Scrolling down
        setIsScrolled(true);
      } else {
        // Scrolling up
        setIsScrolled(currentScrollY > 500); // Adjust the threshold as needed
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.About}>
      <main className={styles.main}>
        <section className={styles.section}>
          {/* TEMPLATE */}
          {/*
          <div
            className={`${styles.childOne} ${
              isScrolled ? styles.slide_in : ""
            }`}
          >
            Child One
          </div>
          <div
            className={`${styles.childTwo} ${
              isScrolled ? styles.slide_in : ""
            }`}
          >
            Child Two
          </div>
          */}
          {/* TEMPLATE */}

          <h1
            style={{ fontSize: "4rem", fontWeight: "bold", textAlign: "start" }}
          >
            Who are we?
          </h1>
          <p style={{ textAlign: "start", whiteSpace: "pre-line" }}>
            At V-Arts, we're a team of five people with a shared dream: to
            create an online marketplace where artistry expands.
            <br /> We believe in the power of AI to develop the art industry,
            and we're dedicated to making that vision a reality. <br />
            With our combined skills and expertise, we're working hard to build
            a platform that empowers artists and connects them with a global
            audience. <br />
            Join us on this journey as we dive in to make creativity a way to
            make profit!
          </p>
          <div className={styles.founders}>
            <div className={styles.bubble}>
              <img
                src="founder1.jpg"
                alt="Founder 1"
                className={styles.founderImage}
              />
            </div>
            <div className={styles.bubble}>
              <img
                src="founder2.jpg"
                alt="Founder 2"
                className={styles.founderImage}
              />
            </div>
            {/* Add more bubbles for other founders as needed */}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>This is the Footer</footer>
    </div>
  );
};
export default About;
