import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/SearchResults.css';  // Custom styling for search results

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  // Function to fetch search results from the backend
  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await fetch(`http://localhost:5000/search?query=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);  // Set results in state
        setQuery(data.query);
      } else {
        setError('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results');
    }
  };

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [location.search]);

  return (
    <div className="search-results-container">
      <h2>Search Results for: "{query}"</h2>
      {error && <p className="error-message">{error}</p>}
      
      {results.length > 0 ? (
        <div>
          <h3>Results</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <a href={result.url}>{result.title}</a> - {result.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
