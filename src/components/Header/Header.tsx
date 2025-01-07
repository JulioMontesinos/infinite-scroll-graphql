import React from "react";
import SearchBar from "../SeachBar/SearchBar";
import "../../styles/header.css";

/**
 * Header Component
 * Renders the application header with a logo and a search bar.
 */

const Header: React.FC<{ query: string; onSearch: (query: string) => void }> = ({ query, onSearch }) => {
  return (
    <header className="header">
      <div className="logo">
        <button>LOGO</button>
      </div>
      <SearchBar query={query} onSearch={onSearch} />
    </header>
  );
};

export default Header;