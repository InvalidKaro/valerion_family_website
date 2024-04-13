import PropTypes from 'prop-types';
import React from 'react';
import popupStyle from "../styles/TermsAndConditionsPopup.module.css"; // Import the CSS module
import textStyle from "../styles/TextStyle.module.css";

/**
 * TermsOfUse component that displays terms and conditions and allows users to accept them.
 *
 * @param {object} content - Object containing the text content to be displayed
 * @param {function} onAccept - Callback function to handle accepting the terms and conditions
 * @param {boolean} accept - State that indicates whether the terms and conditions have been accepted
 * @return {JSX.Element} The component that displays the terms and conditions and allows users to accept them
 */
const Documents = ({ content, onAccept, accept }) => {
  return (
    <div className={popupStyle.popupContainer} style={{ position: "relative", zIndex: "1" }}>
      <div className={popupStyle.popupContent} style={{ padding: "30px", marginInline: "auto" , position: "relative"}}>
        <h1 style={{ fontSize: "var(--size-5xl)" }} className={textStyle.a_h1}>
          {content.title}
        </h1>
        {/* Render the provided terms and conditions text */}
        {content.sections.map((section, index) => (
          <div key={index}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.content && <p>{section.content}</p>}
            {section.list && (
              <ol>
                {section.list.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        ))}
        <p>{content.footer}</p>
      </div>
    </div>
  );
};

Documents.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string,
        content: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    footer: PropTypes.string.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  accept: PropTypes.bool.isRequired,
};

export default Documents;
