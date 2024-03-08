// WhySection.jsx

import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import styles from "../../styles/why.module.css"; // Importing CSS module for styling

const WhySection = (onVisibilityChange) => {
  const [displayText, setDisplayText] = useState({
    text: "Start your journey as an outstanding collector in V-Arts, grow your wealth and imagination! Contribute to the industry as you see it expands!",
    image:
    "https://media.discordapp.net/attachments/1173236829663793172/1210675494509482084/skyov_Very_confident_collector_dressed_in_dark_cloths_looking_v_a08018cd-d95c-47b3-beb8-5eede0665503.png?ex=65eb6c6b&is=65d8f76b&hm=92ab5800f2a5d61d2efff0119ac37e0844e648a8ad97209030c2980ed6c272bb&=&format=webp&quality=lossless"
  });
  const [activeTab, setActiveTab] = useState("Buy");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Buy":
        setDisplayText({
          text: "Start your journey as an outstanding collector in V-Arts, grow your wealth and imagination! Contribute to the industry as you see it expands!",
          image:
          "https://media.discordapp.net/attachments/1173236829663793172/1210675494509482084/skyov_Very_confident_collector_dressed_in_dark_cloths_looking_v_a08018cd-d95c-47b3-beb8-5eede0665503.png?ex=65eb6c6b&is=65d8f76b&hm=92ab5800f2a5d61d2efff0119ac37e0844e648a8ad97209030c2980ed6c272bb&=&format=webp&quality=lossless"
        });
        break;
      case "Sell":
        setDisplayText({
          text: "Embark on your journey to success by starting a new selling career in our amazing community! Unleash your creativity, connect with AI, and effortlessly turn your passion for art into profit. Join us today and watch your dreams come to life!",
          image:
"https://media.discordapp.net/attachments/1173236829663793172/1210675513606283345/skyov_Money_raining_in_front_of_art_collection_happy_man_wearin_bce5763a-50d6-4c58-9421-d9958c9cfeed.png?ex=65eb6c6f&is=65d8f76f&hm=d287f189598fcf1118e03c0cce7fd0fca6139eb859e0ac3fa87b82dc010df108&=&format=webp&quality=lossless"
        });
        break;
      case "Trade":
        setDisplayText({
          text: "The V-Trade area is a place where you can trade your art, increase its value, increase its demand. Become an amazing V-Trader!",
          image:
          "https://media.discordapp.net/attachments/1173236829663793172/1210675495033766008/skyov_Two_gods_shaking_hands_focusing_on_the_hands_themselves_329c35be-bb41-487c-b298-2234b3079cae.png?ex=65eb6c6b&is=65d8f76b&hm=8fd7166eb6d0d29b5bd574cf8cc7293b4d3424e0b61042076ff3285d2c42eb2c&=&format=webp&quality=lossless"
        });
        break;
      default:
        setDisplayText({
          text: "Start your journey as an outstanding collector in V-Arts, grow your wealth and imagination! Contribute to the industry as you see it expands!",
          image:
            "https://cdn.discordapp.com/attachments/918568427285807115/1205563256035475486/skyov_Very_confident_collector_dressed_in_dark_cloths_looking_v_a08018cd-d95c-47b3-beb8-5eede0665503.png?ex=65d8d346&is=65c65e46&hm=ecce9120f315625dba3d2acd3e3d19ef460cc81d0b17ba8b0b7aa3fb8d638c99&", // Update with your image path
        });
    }
  };

  return (
    <section style={{ marginTop: "9em", width: "70%", marginInline: "auto" }}>
      <div className={styles.container}>
        <h2 className={styles.title}>What we offer?</h2>
        <div className={styles.tabs} style={{ fontSize: "1.5em" }}>
          <input
            type="radio"
            id="buy"
            name="tab"
            className={styles.tab}
            checked={activeTab === "Buy"}
            onChange={() => handleTabClick("Buy")}
          />
          <label
            htmlFor="buy"
            className={`${activeTab === "Buy" ? styles.active : ""} ${
              styles.tabLabel
            }`}
          >
            Buying
          </label>

          <input
            type="radio"
            id="sell"
            name="tab"
            className={styles.tab}
            checked={activeTab === "Sell"}
            onChange={() => handleTabClick("Sell")}
          />
          <label
            htmlFor="sell"
            className={`${activeTab === "Sell" ? styles.active : ""} ${
              styles.tabLabel
            }`}
          >
            Selling
          </label>

          <input
            type="radio"
            id="trade"
            name="tab"
            className={styles.tab}
            checked={activeTab === "Trade"}
            onChange={() => handleTabClick("Trade")}
          />
          <label
            htmlFor="trade"
            className={`${activeTab === "Trade" ? styles.active : ""} ${
              styles.tabLabel
            }`}
          >
            Trading
          </label>
        </div>
        
        <div className={`${styles.content} ${displayText ? "show" : ""}`}>
          {displayText && (
            <div className={styles.textWithImageContainer}>
              <img
                src={displayText.image}
                alt=""
                className={styles.image}
              />
              <div className={styles.textOverlay}>
                <Fade className={styles.textAn} delay={1e2} cascade damping={1e-1}>
                  {displayText.text}
                </Fade>
              </div>
            </div>
          )}
        </div>
          
      </div>
    </section>
  );
};

export default WhySection;
