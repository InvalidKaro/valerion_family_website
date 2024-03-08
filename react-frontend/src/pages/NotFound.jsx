import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";
import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
import React, { useEffect } from "react";
import { Fade } from "react-awesome-reveal";

const NotFound = () => {
  useEffect(() => {
    const loadParticles = async (options) => {
      await loadAll(tsParticles);
      await tsParticles.load({ id: "tsparticles", options });
    };

    const configs = {
      particles: {
        number: {
          value: 100,
          
        },

        interactivity: {
          events: {

            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                enable: false,
                force: 60,
                smooth: 10,
              },
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },

            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },

            push: {
              quantity: 4,
            },
            remove: {
              quantity: 2,
            },

            slow: {
              factor: 3,
              radius: 200,
            },
            attract: {
              distance: 2000,
              duration: 0.4,
              easing: "ease-out-quad",
              factor: 1,
              maxSpeed: 50,
              speed: 1,
            },
          },
        },
        color: {
          value: "#ffffff",
        },
        links: {
          enable: true,
          distance: 250,
          color: "#ffffff",
          width: 4,
          triangles: {
            enable: true,
            frequency: 1,
            color: "#3a3a3a",
            opacity: 0.1,
          },
        },
        shape: {
          type: "square",
          options: {
            sides: 5,
          },
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: {
            min: 4,
            max: 8,
          },
        },
        move: {
          enable: true,
          speed: 2,

          gravity: {
            enable: true,
            acceleration: 0.2,
            maxSpeed: 10,

            

           
          },

          drift: {
            enable: true,
            speed: 10,
          },

         
          direction: "none",
          random: true,
          straight: false,
          outMode: "out",
          bounce: false,

          attract: {
            enable: true,
            rotateX: 3000,
            rotateY: 3000,
          },
        },
      },

      detectRetina: true,

      fpsLimit: 60,
      background: {
        color: "#1a1a1a",
      },
      poisson: {
        enable: true,
        force: 1,
        threshold: 2,
        maxSpeed: 1,
        direction: "top",
      },
    };

    loadParticles(configs);
  }, []);

  useEffect(() => {
    const docTitle = "404 not found";

    const onFocus = () => {
      document.title = docTitle;
    };

    window.addEventListener("focus", onFocus);

    // Clean up the event listeners when the component is unmounted
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <div
      className="tsparticles"
      id="tsparticles"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="404"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "5rem",
          zIndex: 1,
          flexWrap: "wrap",
          flexDirection: "column",
          textShadow: "0 0 10px black",
        }}
      >
        <Fade
          duration={2000}
          cascade
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white", fontSize: "5rem" }}>
            404 - Page Not Found
          </h1>
          <p style={{ whiteSpace: "normal", fontSize: "2rem", paddingInline: "1em" }}>
            Sorry, the page you are looking for could not be found. <br />
            Please check the URL or use the navigation above to return to the
            homepage.
          </p>
        </Fade>
      </div>
    </div>
  );
};

export default NotFound;
