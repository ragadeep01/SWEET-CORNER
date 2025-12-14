import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Recommendation from "../Components/Recommendation";
import Header from "../Components/Header";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [allSweets, setAllSweets] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSweets = async () => {
      try {
        const res = await fetch("/api/sweets", { credentials: "include" });
        const data = await res.json();
        setAllSweets(data);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };

    fetchSweets();
  }, []);

  // Filter sweets based on search text
  const filteredSweets = allSweets.filter(
    (sweet) =>
      sweet.name &&
      sweet.name.toLowerCase().includes(query) 
  );

  return (
    <>
      <Header />
      <div className="search-results-container">
        <h1>Search Results for: "{query}"</h1>

        {filteredSweets.length > 0 ? (
          <div className="recommendations-list">
            {filteredSweets.map((sweet, index) => (
  <Recommendation key={index} sweet={sweet} />
))}

          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}

export default SearchResults;
