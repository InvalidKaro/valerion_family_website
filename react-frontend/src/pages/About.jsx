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

  const founders = [
    {
      src: "https://cdn.discordapp.com/avatars/263724696116264961/4369ac1fcf1d69947aa3bb465457d582.png?size=4096",
      name: "DeathSHAADOOOWS",
      quote: "Quote 1",
      style: {
        // add any specific styling here
      },
    },
    {
      src: "https://cdn.discordapp.com/avatars/792839933387472918/a_20ce85b6c6fae90265f5af7ef4192198.gif?size=4096",
      name: "invalidkaro",
      quote: "Ganja ist die Heilung einer Nation, Alkohol ist ihre Zerstörung",
      style: {
      },
    },
    {
      src: "https://cdn.discordapp.com/avatars/792839933387472918/a_2641053c382b169c1295a3ee1e46105e.gif?size=4096",
      name: "Sky 3",
      quote: "Quote 3",
      style: {
      },
    },
    {
      src: "https://cdn.discordapp.com/avatars/792839933387472918/a_2641053c382b169c1295a3ee1e46105e.gif?size=4096",
      name: "Founder 4",
      quote: "Quote 4",
      style: {
      },
    },
    {
      src: "https://cdn.discordapp.com/avatars/792839933387472918/a_2641053c382b169c1295a3ee1e46105e.gif?size=4096",
      name: "Founder 5",
      quote: "Quote 5",
      style: {

      },
    },
  ];

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
            {founders.map((founder, index) => (
              <div className={styles.card}>
              <div key={index} id={`founder-${index}`} className={styles.bubble} style={founder.style}>
                <img
                  src={founder.src}
                  alt={founder.name}
                  className={styles.founderImage}
                />
               
              </div>
              <p>{founder.name}</p>
              <br></br>
              <p style={{ textAlign: "center", fontSize: "0.9rem", maxWidth: "10rem" }}>{founder.quote}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>This is the Footer</footer>
    </div>
  );
};
export default About;
