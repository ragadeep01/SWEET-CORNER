import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Recommendation from "../Components/Recommendation";
import "../index.css";
import Header from "../Components/Header";

function CategoryPage() {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const categories = [
    { name: "INDIAN SWEETS", image: "/indian_icon.jpg" },
    { name: "DRY FRUIT", image: "/dryfruit_icon.png" },
    { name: "HALWA", image: "/halwa_icon.jpg" },
    { name: "SUGAR FREE", image: "/sugarfree.jpg" }
  ];

  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await fetch("/api/sweets", {
          credentials: "include",
        });
        const data = await res.json();
        setSweets(data);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };

    fetchSweets();
  }, []);

  const filteredSweets = sweets.filter(
    (sweet) =>
      sweet.category &&
      sweet.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="category-page-container">
      <Header />

      <div className="category-page">

        {}
        <div className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.name}   
                className={
                  categoryName.toLowerCase() === cat.name.toLowerCase()
                    ? "active"
                    : ""
                }
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "15px",
                    marginRight: "8px",
                  }}
                />
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="recommendation-container">
          <h2>{categoryName}</h2>

          <div className="recommendation-crops">
            {filteredSweets.length > 0 ? (
              filteredSweets.map((sweet) => (
                <Recommendation 
                  key={sweet._id}  
                  sweet={sweet} 
                />
              ))
            ) : (
              <p>No sweets available in this category.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CategoryPage;
