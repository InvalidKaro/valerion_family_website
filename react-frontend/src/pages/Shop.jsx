import React, { useState } from "react";
import { useUser } from "../UserContext";
import Footer from "../components/Footer/commonFooter";
import SearchComponent from "../components/Queries/search";
import ProductItems from "../components/productItems";
import { useAuth } from "../pages/auth";
import "../styles/App.css";
import buttonStyle from "../styles/button.module.css";
import "../styles/shop.css";
function Shop() {
  const { user } = useUser();
  const { navigate } = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    // Sort the results by relevance (you need to implement this logic based on your requirements)
    const sortedResults = results.sort((a, b) => {
        // Example: Sort by title length
        return a.title.length - b.title.length;
    });
    // Update state with only the first three results
    setSearchResults(sortedResults.slice(0, 3).map(result => ({
        ...result,
        picture_url: `http://localhost:80/Art/watermarked_${result.picture_url}` // Prepend the URL
    })));
};

  const uploadButtonClick = (e) => {
    console.log("Buy button clicked");
    e.preventDefault();

    // Add logic to handle the buy button click, e.g., redirect to the purchase page
    navigate("/upload");
  };

  return (
    <div className="Shop">
      <head>
        <title>bacon</title>
      </head>
      <main className="shop-main">
        <SearchComponent onSearchResults={handleSearchResults} />
             {/* Render search results */}
             <diV className="search-results">
             <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        <div>
                            <img src={result.picture_url} alt={result.title} />
                            <h2>{result.title}</h2>
                            <p>Price: {result.price}</p>
                            <p>Author: {result.author}</p>
                            {/* Render other properties as needed */}
                        </div>
                    </li>
                ))}
            </ul>
            </diV>   
        <button
          onClick={uploadButtonClick}
          className={buttonStyle.glow_btn}
          style={{
            borderRadius: "25px",
            width: "30vh",
            marginInline: "auto",
            display: "block",
            marginTop: "10px",
          }}
        >
          Upload your own
        </button>
        <ProductItems/>
        {user && user.username ? ( // Check if user and username exist
          <div>
            <h1>Welcome, {user.username}!</h1>
            {/* Add more user information if needed */}
          </div>
        ) : (
          <div>
            <h1>Welcome!</h1>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

