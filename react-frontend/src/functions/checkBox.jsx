import React, { useState, useEffect } from 'react';
export default function CheckBox({ acceptTerms }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    // Call the acceptTerms function when the checkbox is checked
    if (!checked) {
      acceptTerms();
    }
  };


  const checkboxStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '20px',
    height: '20px',
    backgroundColor: checked ? 'green' : 'transparent',
    border: '2px solid green',
    borderRadius: '5px',
    marginRight: '10px',
    marginTop: '10px',
    cursor: 'pointer',
  };

  const checkmarkStyle = {
    display: checked ? 'block' : 'none',
    position: 'absolute',
    top: '3px',
    left: '6px',
    width: '5px',
    height: '10px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  };
  const labelStyle = {
    cursor: 'pointer',
    textAlign: 'center',
    display: 'inline-block', // Added to display the label inline
  };


  return (
    <div>
      <div style={checkboxStyle} onClick={handleCheckboxChange}>
        <div style={checkmarkStyle}></div>
      </div>
      <label htmlFor="myCheckbox" style={labelStyle}>I understand and accept the agreement</label>
    </div>
  );
}