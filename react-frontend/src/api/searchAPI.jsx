// SearchAPI.jsx
const SearchAPI = (query) => {
    // Construct the URL based on the search query
    const url = query.startsWith('@') 
        ? `http://localhost:80/search.php?search=${encodeURIComponent(query)}`
        : `http://localhost:80/search.php?search=${encodeURIComponent(query)}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        // Process the fetched data (if needed)
        return data; // Return the search results
      })
      .catch(error => {
        throw error; // Propagate the error
      });
};

export default SearchAPI;
