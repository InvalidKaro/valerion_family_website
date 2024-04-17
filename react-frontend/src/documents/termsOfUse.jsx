import popupStyle from "../styles/TermsAndConditionsPopup.module.css"; // Import the CSS module
import textStyle from "../styles/TextStyle.module.css";
import contentGuidelinesContent from "./content";
import copyrightPolicyContent from "./copyrightPolicy";
import Documents from "./docs";
import licenseAgreementContent from "./license";
import paymentAndPricingTermsContent from "./payment";
import privacyPolicyContent from "./privacyPolicy";
import RefundPolicy from "./refund";
import securityMeasuresContent from "./security";

/**
 * TermsAndConditionsPopup component that displays terms and conditions and allows users to accept them.
 *
 * @param {function} onAccept - Callback function to handle accepting the terms and conditions
 * @param {boolean} accept - State that indicates whether the terms and conditions have been accepted
 * @return {JSX.Element} The component that displays the terms and conditions and allows users to accept them
 */


const TermsOfUse = () => {

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default behavior of the anchor tag
    const href = e.target.getAttribute('href'); // Get the href attribute of the clicked link
    const targetElement = document.querySelector(href); // Find the target element by ID
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element smoothly
    }
  };
  return (

    <div
      className={popupStyle.popupContainer}
      style={{ position: "relative", zIndex: "1" }}
    >

<div className={popupStyle.sidebar}>

        <ul className={popupStyle.sidebarList}>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#acceptance-of-terms"onClick={handleClick}>Acceptance of Terms</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#refund-policy"onClick={handleClick}>Refund Policy</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#privacy-policy"onClick={handleClick}> Privacy Policy</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#copyright"onClick={handleClick}>Copyright</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#license"onClick={handleClick}>License</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#content"onClick={handleClick}>Content Guidelines</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#payment-pricing"onClick={handleClick}>Payment and Pricing</a>
          </li>
          <li className={popupStyle.sidebarListItem}>
            {" "}
            <a href="#security"onClick={handleClick}>Security Measures</a>
          </li>
        </ul>
      </div>
      <div
        className={popupStyle.popupContent}
        style={{ padding: "30px", marginInline: "auto", position: "relative" }}
      >
        <h1 style={{ fontSize: "var(--size-5xl)" }} className={textStyle.a_h1}>
          Terms of Use
        </h1>
        {/* Add the provided terms and conditions text here */}

        <p>
          <strong>Last Updated: 22/02/2024</strong>
        </p>

        <p>
          Welcome to V-arts, your online marketplace for digital art. By
          accessing or using our website, you agree to comply with these Terms
          of Use. Please read them carefully before proceeding.
        </p>
        <section id="acceptance-of-terms" style={{ marginTop: "0" }}>
          <h2>1. Acceptance of Terms:</h2>
          <ol>
            <li>
              By accessing or using our website, you agree to be bound by these
              Terms of Use and all applicable laws and regulations. If you do
              not agree with any part of these terms, you may not access or use
              our website.
            </li>
          </ol>

          <h2>2. Use of Website:</h2>
          <ol>
            <li>
              You may use our website for lawful purposes only. You agree not to
              use our website in any way that violates applicable laws or
              infringes on the rights of others.
            </li>
          </ol>

          <h2>3. Intellectual Property:</h2>
          <p>
            All content and materials on our website, including but not limited
            to digital art, images, text, logos, and trademarks, are the
            property of V-Arts or its licensors and are protected by copyright
            and other intellectual property laws.
          </p>

          <h2>4. Digital Art Purchases:</h2>
          <ol>
            <li>
              When purchasing digital art on our website, you agree to abide by
              the terms of the license agreement provided with each artwork. You
              may not reproduce, distribute, or modify purchased digital art in
              any way that violates the terms of the license agreement.
            </li>
          </ol>

          <h2>5. User Conduct:</h2>
          <ol>
            <li>
              You are solely responsible for your conduct while using our
              website. You agree not to engage in any conduct that is unlawful,
              abusive, harassing, defamatory, or otherwise objectionable.
            </li>
          </ol>

          <h2>6. Privacy:</h2>
          <ol>
            <li>
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and protect your personal
              information.
            </li>
          </ol>

          <h2>7. Limitation of Liability:</h2>
          <p>
            In no event shall V-Arts or its affiliates be liable for any direct,
            indirect, incidental, special, or consequential damages arising out
            of or in any way connected with your use of our website.
          </p>

          <h2>8. Changes to Terms:</h2>
          <p>
            We reserve the right to modify or update these Terms of Use at any
            time without prior notice. Your continued use of our website after
            any such changes constitutes your acceptance of the new terms.
          </p>

          <h2>9. Governing Law:</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with the laws of Austria, without regard to its conflict of law
            provisions.
          </p>

          <h2>10. Contact:</h2>
          <p>
            For questions or concerns regarding these terms, please contact us
            at{" "}
            <a href="mailto:V-Arts.development@gmail.com">
              V-Arts.development@gmail.com
            </a>
            .
          </p>
          <p>Thank you for using V-arts. We hope you enjoy your experience!</p>
        </section>
      </div>
      <section id="refund-policy" style={{ marginTop: "0" }}>
        {" "}
        <RefundPolicy />
      </section>
      <section id="privacy-policy" style={{ marginTop: "0" }}>
        {" "}
        <Documents content={privacyPolicyContent} />
      </section>
      <section id="copyright" style={{ marginTop: "0" }}>
        <Documents
          content={copyrightPolicyContent}
          style={{ marginTop: "20px" }}
        />
      </section>
      <section id="license" style={{ marginTop: "0" }}>
        <Documents
          content={licenseAgreementContent}
          style={{ marginTop: "20px" }}
        />
      </section>
      <section id="content" style={{ marginTop: "0" }}>
        <Documents
          content={contentGuidelinesContent}
          style={{ marginTop: "20px" }}
        />
      </section>
      <section id="payment-pricing" style={{ marginTop: "0" }}>
        <Documents
          content={paymentAndPricingTermsContent}
          style={{ marginTop: "20px" }}
        />
      </section>
      <section id="security" style={{ marginTop: "0" }}>
        <Documents
          content={securityMeasuresContent}
          style={{ marginTop: "20px" }}
        />
      </section>
     
    </div>
  );
};

export default TermsOfUse;


