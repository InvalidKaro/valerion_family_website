import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chroma from "chroma-js";
import React from "react";
import Select from "react-select";
import { colourOptions } from "../../data/data";
import styles from "../../styles/admin.module.css"; // Import the CSS file

console.log(colourOptions);

// TypeScript type annotations removed for JavaScript compatibility
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    zIndex: 5000,
    display: "flex",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
      zIndex: 5000, // Set the z-index to ensure the options appear above other elements
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const SelectComponent = ({ value, onChange, options }) => {
  console.log(options);
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  console.log(colourOptions);
  return (
    <Select
      name={value}
      defaultValue={[colourOptions[5]]}
      options={colourOptions}
      styles={{
        ...colourStyles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      value={options.find((option) => option.value === value)}
      onChange={handleChange}
      isSearchable={true}
      tabIndex={20000}
      menuPosition="absolute"
      menuPortalTarget={document.body}
      closeMenuOnSelect={true}
      loadingMessage={"Loading... Please wait."}
      formatOptionLabel={({ label, icon, color, isSelected }) => (
        <div style={{ color: isSelected ? "black" : color, width: '200px' }}>
        <FontAwesomeIcon
            icon={icon}
            style={{ 
              backgroundColor: isSelected ? color : "transparent", 
              color: isSelected ? "white" : color, 
              filter: isSelected ? "none" : "invert(1)"
            }}         
            className={`${styles.icon} developer`}
          />{" "}
          {label}
          
        </div>
      )}
    />
  );
};

export default SelectComponent;
