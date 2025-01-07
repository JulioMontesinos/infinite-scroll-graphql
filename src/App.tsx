import React, { useState } from "react";
import Header from "./components/Header/Header";
import "./styles/app.css";
import ImageLoader from "./components/ImageLoader/ImageLoader";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Controls the search input

  return (
    <div>
      <Header query={searchQuery} onSearch={setSearchQuery} />
      <ImageLoader searchQuery={searchQuery} />
    </div>
  );
};


export default App;