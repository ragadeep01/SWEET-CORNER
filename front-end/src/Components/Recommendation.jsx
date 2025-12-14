import React from "react";
import { useNavigate } from "react-router";
import "../index.css";

function Recommendation({ sweet }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details", { state: { sweet } });
  };
  // console.log(sweet.image);
  const imageUrl = sweet.image
    ? `http://localhost:3000${sweet.image}`
    : "/apple.png"; // Default image if none provided

  return (
    <div className="recommendation" onClick={handleClick}>
      <img src={imageUrl} alt={sweet.name} />

      <div className="recommendation-content">
        <p><b>Sweet:</b> {sweet.name}</p>
        <p><b>Category:</b> {sweet.category}</p>
        <p><b>Price:</b> ₹{sweet.price}</p>

        {sweet.quantity > 0 ? (
          <p><b>In Stock:</b> {sweet.quantity}</p>
        ) : (
          <p style={{ color: "red" }}><b>Out of Stock</b></p>
        )}
      </div>
    </div>
  );
}

export default Recommendation;
