import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchAPI from '../../api/searchAPI'; // Assuming 'searchAPI' is the function that performs the search

function SearchComponent({ onSearchResults }) {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300);
    const [loading, setLoading] = useState(false);

    // Function to handle search
    function handleSearch() {
        if (debouncedQuery) {
            setLoading(true);
            // Call the search API with the debounced query
            SearchAPI(debouncedQuery)
                .then(results => {
                    onSearchResults(results); // Pass the results to the parent component
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    onSearchResults([]); // Pass empty results to the parent component
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            onSearchResults([]); // Pass empty results to the parent component
            setLoading(false); // Reset loading state
        }
    }

    // Function to handle clearing the search
    function handleClear() {
        setQuery("");
        onSearchResults([]); // Pass empty results to the parent component
        setLoading(false); // Reset loading state
    }

    // Function to handle input change
    function handleInput(e) {
        const text = e.target.value;
        setQuery(text);

        // Trigger search whenever input changes
        if (text.trim() !== "") {
            handleSearch();
        } else {
            setLoading(false); // Reset loading state if input is empty
        }
    }

    // Function to handle pasting text
    function handlePaste(e) {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        setQuery(text);

        // Trigger search whenever pasting text
        if (text.trim() !== "") {
            handleSearch();
        } else {
            setLoading(false); // Reset loading state if input is empty
        }
    }

    return (
        <div>
            <input
                type="search"
                value={query}
                onChange={handleInput}
                onPaste={handlePaste}
                placeholder="Search... title, @user"
            />
        </div>
    );
}

export default SearchComponent;
