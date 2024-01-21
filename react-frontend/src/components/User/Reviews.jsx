import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/userinfo.css';

const ReviewDetail = () => {
  const [Review, setReview] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the productId
    fetchReview();
  }, []);
  const fetchReview = () => {
    fetch(`http://localhost:80/userReviews.php?username=Karo`) // Update the URL to your PHP script
      .then(response => response.json())
      .then(data => {
        setReview(data);
      })
      .catch(error => {
        console.error('Error fetching Review details:', error);
        setReview(null);
      });
  };

  if (!Review) {
    return <div>Loading...</div>;
  }

  return (
    <div className='review_section'>
        <br></br>
      {Review.map((review, index) => (
        
        <div key={index}>

            <p>Author: {review.author}</p>
            <p>Review Text: {review.review_text}</p>
            <p>Rating:
            <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < review.rating ? "full" : "empty"}></span>
            ))}
          </div>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewDetail;