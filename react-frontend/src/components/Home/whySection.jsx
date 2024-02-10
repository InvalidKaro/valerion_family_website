// WhySection.jsx

import React, { useState } from 'react';
import styles from '../../styles/why.module.css'; // Importing CSS module for styling

const WhySection = () => {
  const [displayText, setDisplayText] = useState({
    text: 'Start your journey as an outstanding collector in V-Arts, grow your wealth and imagination! Contribute to the industry as you see it expands!',
    image: 'https://cdn.discordapp.com/attachments/918568427285807115/1205563256035475486/skyov_Very_confident_collector_dressed_in_dark_cloths_looking_v_a08018cd-d95c-47b3-beb8-5eede0665503.png?ex=65d8d346&is=65c65e46&hm=ecce9120f315625dba3d2acd3e3d19ef460cc81d0b17ba8b0b7aa3fb8d638c99&' // Update with your image path
  });
  const [activeTab, setActiveTab] = useState('Buy');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'Buy':
        setDisplayText({
          text: 'Start your journey as an outstanding collector in V-Arts, grow your wealth and imagination! Contribute to the industry as you see it expands!',
          image: 'https://cdn.discordapp.com/attachments/918568427285807115/1205563256035475486/skyov_Very_confident_collector_dressed_in_dark_cloths_looking_v_a08018cd-d95c-47b3-beb8-5eede0665503.png?ex=65d8d346&is=65c65e46&hm=ecce9120f315625dba3d2acd3e3d19ef460cc81d0b17ba8b0b7aa3fb8d638c99&' // Update with your image path
        });
        break;
      case 'Sell':
        setDisplayText({
          text: 'Embark on your journey to success by starting a new selling career in our amazing community! Unleash your creativity, connect with AI, and effortlessly turn your passion for art into profit. Join us today and watch your dreams come to life!',
          image: 'https://cdn.discordapp.com/attachments/918568427285807115/1205564721307066378/skyov_Money_raining_in_front_of_art_collection_happy_man_wearin_bce5763a-50d6-4c58-9421-d9958c9cfeed.png?ex=65d8d4a3&is=65c65fa3&hm=43fcb577d3eebbdf9633b1f54b5cb3b0d2c09705d71717067bbb2a59bc5f94be&' // Update with your image path
        });
        break;
      case 'Trade':
        setDisplayText({
          text: 'The V-Trade area is a place where you can trade your art, increase its value, increase its demand. Become an amazing V-Trader!',
          image: 'https://cdn.discordapp.com/attachments/918568427285807115/1205563285512912998/skyov_Two_gods_shaking_hands_focusing_on_the_hands_themselves_329c35be-bb41-487c-b298-2234b3079cae.png?ex=65d8d34d&is=65c65e4d&hm=81458d8e607826fa7805b82bd8daa06a57c593eaf3b7846bae840053e14b2a60&' // Update with your image path
        });
        break;
      default:
        setDisplayText({
          text: 'Start your journey as an outstanding collector in V-Arts, grow your wealth and imagination! Contribute to the industry as you see it expands!',
          image: 'https://cdn.discordapp.com/attachments/918568427285807115/1205563256035475486/skyov_Very_confident_collector_dressed_in_dark_cloths_looking_v_a08018cd-d95c-47b3-beb8-5eede0665503.png?ex=65d8d346&is=65c65e46&hm=ecce9120f315625dba3d2acd3e3d19ef460cc81d0b17ba8b0b7aa3fb8d638c99&' // Update with your image path
        });
    }
  };

  return (
    <section style={{marginTop: "4em"}}>
    <div className={styles.container}>
      <e className={styles.title}>What we offer?</e>
      <div className={styles.tabs}>
        <button className={activeTab === 'Buy' ? styles.active : ''} onClick={() => handleTabClick('Buy')}>
          Buying
        </button>
        <button className={activeTab === 'Sell' ? styles.active : ''} onClick={() => handleTabClick('Sell')}>
          Selling
        </button>
        <button className={activeTab === 'Trade' ? styles.active : ''} onClick={() => handleTabClick('Trade')}>
          Trading
        </button>
      </div>
      <div className={`${styles.content} ${displayText ? 'show' : ''}`}>
        {displayText && (
          <div className={styles.textWithImageContainer}>
            <img src={displayText.image} alt="Image" className={styles.image} />
            <div className={styles.textOverlay}>
              <p>{displayText.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
  );
}

export default WhySection;
