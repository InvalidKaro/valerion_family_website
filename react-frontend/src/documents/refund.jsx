import popupStyle from "../styles/TermsAndConditionsPopup.module.css"; // Import the CSS module
import textStyle from "../styles/TextStyle.module.css";

/**
 * TermsAndConditionsPopup component that displays terms and conditions and allows users to accept them.
 *
 * @param {function} onAccept - Callback function to handle accepting the terms and conditions
 * @param {boolean} accept - State that indicates whether the terms and conditions have been accepted
 * @return {JSX.Element} The component that displays the terms and conditions and allows users to accept them
 */
const RefundPolicy = () => {
  return (
    <div
      className={popupStyle.popupContainer}
      style={{
        position: "relative",
        zIndex: "1",
      }}
    >
      <div
        className={popupStyle.popupContent}
        style={{
          padding: "30px",
          marginInline: "auto",
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "var(--size-5xl)" }} className={textStyle.a_h1}>
          Refund and Return Policy
        </h1>
        {/* Add the provided terms and conditions text here */}

        <p>
          <strong>Last Updated: 22/02/2024</strong>
        </p>

        <p>
          Welcome to V-Arts, your online marketplace for digital art. We want
          you to be completely satisfied with your purchase. If you have any
          questions or concerns about our Refund and Return Policy, please
          contact us at{" "}
          <a href="mailto:V-Arts.development@gmail.com">
            V-Arts.development@gmail.com
          </a>
          .
        </p>

        <h2>1. Refunds</h2>
        <ol>
          <li>
            We offer refunds on digital art purchases under the following
            circumstances: The digital art file is corrupted or incomplete and
            cannot be downloaded or accessed.
          </li>
          <li>
            An error occurring during your final transaction, and if you have
            been charged because of it.
          </li>
          <li>
            <b>
              To request a refund, please contact us within [number] days of
              your purchase. We may require proof of purchase and/or additional
              information to process your refund request.
            </b>
          </li>
        </ol>

        <h2>2. Returns</h2>
        <ol>
          <li>
          Due to the nature of digital products, we do not accept returns for digital art purchases. However, if you encounter any issues with your purchase, please contact us and we will do our best to resolve the issue.
          </li>
        </ol>

        <h2>3. Cancellations</h2>
        <p>
        You may cancel your order for digital art before the download process has been initiated. Once the download process has started, your order cannot be cancelled.
        </p>

       

        <h2>4. Contact:</h2>
        <p>
        If you have any questions or concerns about our Refund and Return Policy, please contact us at{" "}
          <a href="mailto:V-Arts.development@gmail.com">
            V-Arts.development@gmail.com
          </a>
          .
        </p>
        <p>Thank you for using V-arts. We hope you enjoy your experience!</p>
      </div>
    </div>
  );
};

export default RefundPolicy;
