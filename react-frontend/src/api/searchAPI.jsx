// SearchAPI.jsx
const SearchAPI = async (query) => {
    // Construct the URL based on the search query
    const url = query.startsWith('@') 
        ? `http://localhost:80/search.php?search=${encodeURIComponent(query)}`
        : `http://localhost:80/search.php?search=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};


export default SearchAPI;
