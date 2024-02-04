import React, { useState } from "react";

export default function CheckBox({ acceptTerms, loading, setLoading }) {
  const [checked, setChecked] = useState(false);
  console.log(loading);
  const handleCheckboxChange = () => {
    setChecked(!checked);
    setLoading(!loading);
    // Call the acceptTerms function when the checkbox is checked
    if (!checked) {
      setLoading(!loading);
      acceptTerms();
    }
  };

  const checkboxStyle = {
    position: "relative",
    display: "block",
    width: "20px",
    height: "20px",
    backgroundColor: checked ? "green" : "transparent",
    border: "2px solid green",
    borderRadius: "5px",
    marginTop: "10px",
    marginInline: "auto",
    cursor: "pointer",
  };

  const checkmarkStyle = {
    display: checked ? "block" : "none",
    position: "absolute",
    top: "3px",
    left: "6px",
    width: "5px",
    height: "10px",
    border: "solid white",
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  };
  const labelStyle = {
    cursor: "pointer",
    textAlign: "center",
    display: "block", // Added to display the label inline
  };

  return (
    <div>
      {loading ? (
        <div>
          <br /> <br />
        </div>
      ) : null}
      <div style={checkboxStyle} onClick={handleCheckboxChange}>
        <div style={checkmarkStyle}></div>
      </div>

      <label htmlFor="myCheckbox" style={labelStyle}>
        I understand and accept the agreement
      </label>
    </div>
  );
}
