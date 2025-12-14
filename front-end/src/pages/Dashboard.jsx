import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header.jsx";
import Navbar from "../Components/Navbar.jsx";
import Category from "../Components/Category.jsx";
import Recommendation from "../Components/Recommendation.jsx";

import "../index.css";

const categories = [
  { name: "INDIAN SWEETS", image: "/indian_icon.jpg" },
  { name: "DRY FRUIT", image: "/dryfruit_icon.jpg" },
  { name: "Halwa", image: "/halwa_icon.jpg" },
  { name: "SUGAR FREE", image: "/sugarfree.jpg" },
];

function Dashboard() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await fetch("/api/sweets", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setSweets(data);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };

    fetchSweets();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
<div className="head-content" style={{ height: "250px" }}>  
        <img 
          src="welcomeimage.jpg" 
          alt="sweets" 
          style={{ height: "100%", objectFit: "cover", width: "97%" }}
        />
        <p className="text-overlay">
          <span style={{color:"#fefefe", fontFamily: "cursive"}}>Welcome to SweetCorner</span> 
          <br/> 
          <span style={{color:"#ffef0aff", fontFamily: "sans-serif"}}>Where Every Sweet Is Made With a little extra Love and Care</span>
        </p>
        </div>
      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-container">
          <h2 className="categories-heading">Categories</h2>
          <div className="categories">
            {categories.map((category, index) => (
              <Category key={index} name={category.name} image={category.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Sweets List */}
      <section className="recommendations">
        <h2>Available Sweets</h2>
        <div className="recommendation-crops">
          {sweets.length > 0 ? (
            sweets.map((sweet, index) => (
              <Recommendation key={index} sweet={sweet} />
            ))
          ) : (
            <p>No sweets available</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
