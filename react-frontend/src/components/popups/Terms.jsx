import React, { useState } from "react";
import loginStyle from '../../styles/login.module.css';
import buttonStyle from '../../styles/button.module.css';
import textStyle from '../../styles/TextStyle.module.css';
import ColorCheckboxes from '../../functions/checkBox'; // Assuming ColorCheckboxes.js is in the same directory
import popupStyle from '../../styles/TermsAndConditionsPopup.module.css'; // Import the CSS module

const TermsAndConditionsPopup = ({ onAccept, accept,  }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { setAccepted } = useState('');
  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';

  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto';

  };

  const acceptTerms = () => {
    console.log("Terms and Conditions accepted");
    onAccept(true); // Call the onAccept callback with true to update the accept state
    closePopup(); // Close the popup after accepting
  };

  return (
    <>
      <span 
        onClick={openPopup} 
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        Terms and Conditions
        
      </span>          

  
      {showPopup && (
        <div 
          className={popupStyle.popupContainer} 
          

        >
          <div className={popupStyle.popupContent} style={{ marginTop: "30%" }}>
          <button onClick={closePopup} className={buttonStyle.closeButton}>X</button>

            <h1 style={{ fontSize: 'var(--size-5xl)' }} className={textStyle.a_h1}>Terms and Conditions</h1>
            {/* Add the provided terms and conditions text here */}
            <h1 className={popupStyle.h1}>User Reviews Upload Terms and Conditions</h1>
  
            <p><strong>Last Updated: [Date]</strong></p>
  
            <p>Welcome to V-Arts! We appreciate your contribution to our community through user reviews. Before you proceed to upload any reviews, please take a moment to read and understand the following terms and conditions. By uploading user reviews on V-Arts, you agree to be bound by these terms.</p>
  
            <h2>1. Eligibility:</h2>
            <ol>
                <li>You must be at least 18 years old to upload user reviews on V-Arts.</li>
                <li>You must have the legal right to submit the reviews, ensuring they do not infringe upon any third-party rights, including copyright, trademark, or privacy.</li>
            </ol>
  
            <h2>2. Content Guidelines:</h2>
            <ol>
                <li>Reviews must be accurate, unbiased, and based on personal experiences.</li>
                <li>Do not upload content that is offensive, defamatory, discriminatory, or violates any applicable laws or regulations.</li>
                <li>Avoid using inappropriate language, hate speech, or personal attacks in your reviews.</li>
            </ol>
  
            <h2>3. Ownership and License:</h2>
            <p>By uploading reviews, you grant V-Arts a worldwide, non-exclusive, royalty-free, transferable license to use, display, reproduce, distribute, and prepare derivative works of your content.</p>
  
            <h2>4. Moderation and Removal:</h2>
            <ol>
                <li>V-Arts reserves the right to moderate, edit, or remove any reviews that violate these terms or our community guidelines.</li>
                <li>We may, at our discretion, disclose your identity if required by law or in response to a valid legal request.</li>
            </ol>
  
            <h2>5. Privacy:</h2>
            <ol>
                <li>Do not include personal information, such as names, addresses, or contact details, in your reviews.</li>
                <li>V-Arts takes user privacy seriously. Please review our Privacy Policy for more details on how we handle user data.</li>
            </ol>
  
            <h2>6. Accuracy and Authenticity:</h2>
            <ol>
                <li>Ensure that your reviews are truthful and reflect your genuine experiences.</li>
                <li>Do not submit reviews for products or services you have not personally used or experienced.</li>
            </ol>
  
            <h2>7. Indemnification:</h2>
            <p>You agree to indemnify and hold V-Arts harmless from any claims, damages, or liabilities arising from your reviews or any breach of these terms.</p>
  
            <h2>8. Termination:</h2>
            <p>V-Arts reserves the right to terminate your access to the review feature or the entire platform if you violate these terms.</p>
  
            <h2>9. Changes to Terms:</h2>
            <p>V-Arts may update these terms from time to time. We will notify users of any significant changes. Continued use of the review feature after such changes constitutes acceptance of the revised terms.</p>
  
            <h2>10. Contact:</h2>
                <p>For questions or concerns regarding these terms, please contact us at <a href="mailto:V-Arts.development@gmail.com">V-Arts.development@gmail.com</a>.</p>
                
            <footer>
            <h3>Proviso:</h3>
            <p style={{ fontSize: 'var(--size-lg)' }}>This platform disclaims liability for reviews authored by minors without parental approval or consent, emphasizing the necessity of parental supervision for minors in their online activities.</p>
            </footer>
  
            <ColorCheckboxes acceptTerms={acceptTerms} />
          </div>
        </div>
      )}
    </>
  );
  
};

export default TermsAndConditionsPopup;