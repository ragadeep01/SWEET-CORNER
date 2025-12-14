import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Category({ name, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${name}`); 
  };
  return (
    <div className="category" onClick={handleClick}>
      <div className="category-img">
      <img src={image} alt={name}/>
      </div>
      <div className="category-title">
      <h3>{name}</h3>
      </div>
    </div>
  );
}

export default Category;
