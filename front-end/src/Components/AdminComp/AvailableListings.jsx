import React from "react";
// import resetForm from 
const AvailableListings = ({ crops, handleEdit, handleDismiss }) => {
  return (
    <div className="available-listings">
      <h2>Available Listings</h2>
      <div className="listing-cards-container">
        {crops.length === 0 ? (
          <p>No crops available for sale.</p>
        ) : (
          crops.map((crop, index) => (
            <div className="listing-card" key={index}>
              <h4>{crop.name}</h4>
              <p><b>Category:</b> {crop.category}</p>
              <p><b>Quantity:</b> {crop.quantity} kg</p>
              <p><b>Price per Unit:</b> ₹{crop.price}</p>
              <div className="listing-actions">
                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                <button className="dismiss-btn" onClick={() => handleDismiss(index)}>Dismiss</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableListings;
