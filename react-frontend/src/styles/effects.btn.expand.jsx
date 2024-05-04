import React, { useState } from "react";
import buttonStyle from "../styles/effects.btn.expand.css";
function PrimaryButton({ text }) {
    const [isAnimate, setIsAnimate] = useState(false);
    const [buttonX, setButtonX] = useState(0);
    const [buttonY, setButtonY] = useState(0);
  
    const handleMouseEnter = (event) => {
      setIsAnimate(true);
      const rect = event.target.getBoundingClientRect();
      setButtonX(event.clientX - rect.left);
      setButtonY(event.clientY - rect.top);

    };
  
    const handleMouseLeave = () => {
      setIsAnimate(false);
      setButtonX(400-buttonX);
      setButtonY(52-buttonY);

    };
  
    return (
      <div id="button-container">
        <button
          className={`primary-button ${isAnimate ? "animate" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
          <span
            className="round"
            style={{
              top: buttonY,
              left: buttonX,
              width: "1px",
              height: "1px"
            }}
          ></span>
        </button>
      </div>
    );
  }
  
  export default PrimaryButton;