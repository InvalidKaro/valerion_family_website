import React, { useState } from "react";
import { useAuth } from "../../pages/auth";
import "../../styles/reviews.css";
import { useUser } from '../../UserContext';

const WriteReviewButton = ({ setReviews }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { isLoggedIn } = useAuth();
  const { user } = useUser();

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setRating(hoveredRating);
  };


  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleSubmit = async () => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      // Show an error message asking the user to log in
      alert("Please log in to write a review.");
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
      setReviews(data.reviews);
      console.log("Reviews:", data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  
    // Close the popup
    closePopup();
  };
  return (
    <>
      <button onClick={openPopup}>Write a review</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Write a Review</h2>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star${num <= rating ? " active" : ""}`}
                  onClick={() => handleStarClick(num)}
                  onMouseEnter={() => handleStarHover(num)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              placeholder="Enter your review"
              value={reviewText}
              onChange={handleReviewChange}
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WriteReviewButton;