import React, { useState } from "react";
import { useAuth } from "../../pages/auth";
import "../../styles/reviews.css";
import { useUser } from '../../UserContext';
import loginStyle from '../../styles/login.module.css';
import buttonStyle from '../../styles/button.module.css';
import textStyle from '../../styles/TextStyle.module.css';
import TermsAndConditionsPopup from "../popups/Terms";

const WriteReviewButton = ({ setReviews, isLoggedIn }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState("");
  const { user } = useUser();
  const [accept, setAccept] = useState(false); // Initialize accept state
  const { hideButtons, setHideButtons} = useState('false');

  const handleAcceptTerms = (accepted) => {
    setAccept(accepted);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };


  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleSubmit = async () => {
    // Check if the user is logged in
    if (!user) {
      // Show an error message asking the user to log in
      alert("Please log in to write a review.");
      return;
    }
  
    if (!accept) {
      // Show an error message asking the user to accept the terms and conditions
      alert("Please accept the terms and conditions to write a review.");
      return;
    }
   
    // Check if the review text is empty and set a default value if it is
    const review = {
      rating: rating,
      text: reviewText || " ",
      author: user.username
    };
  
    try {
      // Send the review data to the PHP endpoint
      const response = await fetch("http://localhost:80/uploadReview.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload review");
      }
  
      const data = await response.json();
      
      // Handle the response from the server
      window.location.reload();

    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  
    // Close the popup
    closePopup();
  };
  return (
    <>
      <button 
      onClick={openPopup} 
      className={buttonStyle.tag_button} 
      style =
      {{ 
          marginTop: "3%", 
          color: "white", 
          backgroundColor: "#0197B2", 
          width: "20%", 
          borderRadius: "13px", 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: "40%",
          }}>
            Write a review
      </button>

      {showPopup && (
        <div className="popup"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <div className={loginStyle.form} style={{ height: "40%", overflow: "" }}>
            <h2 style={{ fontSize: 'var(--size-5xl)' }} className={textStyle.a_h1}>Write a Review</h2>
            <div style={{ display: "flex", justifyContent: "center", backgroundColor: "black"}} className="star-rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star${num <= rating ? " active" : ""}`}
                  onClick={() => handleStarClick(num)}
                  style={{ cursor: "pointer", fontSize: 'var(--size-4xl)' }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              placeholder="Enter your review"
              value={reviewText}
              onChange={handleReviewChange}
              className={loginStyle.input}
            ></textarea>
    <TermsAndConditionsPopup accept={accept} onAccept={handleAcceptTerms} hideButtons={hideButtons}/>

          
            <button className={buttonStyle.tag_button} onClick={handleSubmit} style={{ marginTop: "3%", color: "white", backgroundColor: "#0197B2", width: "40%", borderRadius: "13px", justifyContent: "center", zIndex: "10"}}>Submit</button>
            <button className={buttonStyle.tag_button} onClick={closePopup} style={{ marginTop: "3%", color: "white", backgroundColor: "#0197B2", width: "40%", borderRadius: "13px", justifyContent: "center", zIndex: "10"}}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WriteReviewButton;