import React from "react";
import "../../styles/searchBar.css";

/*
* SearchBar Component 
*
* SearchBar component for capturing user input to perform a search.
* Accepts a query string and a callback function to notify the parent component when the input changes.
*/

const SearchBar: React.FC<{ query: string; onSearch: (query: string) => void }> = ({ query, onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearch(e.target.value); // Notifies the parent component of input changes
  };

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="🔍︎ You're looking for something?"
      value={query} // Controlled by the parent component's state
      onChange={handleSearch}
    />
  );
};

export default SearchBar;