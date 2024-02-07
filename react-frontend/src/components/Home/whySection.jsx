// WhySection.jsx
import React, { useState } from 'react';
import styles from '../../styles/why.module.css'; // Importing CSS module for styling

const WhySection = () => {
  const [displayText, setDisplayText] = useState('Welcome to our platform!');
  const [activeTab, setActiveTab] = useState('Buy');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'Buy':
        setDisplayText('Why Buy? Explanation here.');
        break;
      case 'Sell':
        setDisplayText('Why Sell? Explanation here.');
        break;
      case 'Trade':
        setDisplayText('Why Trade? Explanation here.');
        break;
      default:
        setDisplayText('Welcome to our platform!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button className={activeTab === 'Buy' ? styles.active : ''} onClick={() => handleTabClick('Buy')}>
          Buy
        </button>
        <button className={activeTab === 'Sell' ? styles.active : ''} onClick={() => handleTabClick('Sell')}>
          Sell
        </button>
        <button className={activeTab === 'Trade' ? styles.active : ''} onClick={() => handleTabClick('Trade')}>
          Trade
        </button>
      </div>
      <div className={`${styles.content} ${displayText ? 'show' : ''}`}>
      <br/>
      <br/>
      <br/>
      <br/>
        <p>{displayText}</p>
      </div>
    </div>
  );
}

export default WhySection;
