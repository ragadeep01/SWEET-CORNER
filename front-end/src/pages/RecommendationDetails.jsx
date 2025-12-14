import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";
import Header from "../Components/Header.jsx";
import Recommendation from "../Components/Recommendation.jsx";

function SweetDetails() {
  const location = useLocation();
  const { sweet } = location.state || {};

  const [allSweets, setAllSweets] = useState([]);
  const [quantity, setQuantity] = useState(1);

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
const totalPrice = quantity * sweet.price;
  if (!sweet) return <p>Loading sweet details...</p>;

  const similarSweets = allSweets.filter(
    (s) => s.category === sweet.category && s._id !== sweet._id
  );


  const handlePurchase = async () => {
    if (quantity <= 0) return alert("Invalid quantity");
    if (quantity > sweet.quantity) return alert("Not enough stock");

    try {
      const res = await fetch(`/api/sweets/${sweet._id}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({quantity}),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Purchase successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="recommendation-page">
      <Header />

      <div className="details-container">
        <div className="details-image">
          <img
            src={`http://localhost:3000${sweet.image}` || "/sweet.webp"}
            alt={sweet.name}
          />
        </div>

        <div className="details-content">
          <h2>{sweet.name}</h2>

          <p><b>Category:</b> {sweet.category}</p>
          <p><b>Price:</b> ₹{sweet.price}</p>
          <p><b>Stock Available:</b> {sweet.quantity}</p>

          {sweet.quantity === 0 ? (
            <button className="details-button" disabled style={{ background: "gray" }}>
              Out of Stock
            </button>
          ) : (
            <>
              <label><b>Quantity:</b></label>
<input
  type="number"
  min="1"
  max={sweet.quantity}
  value={quantity}
  onChange={(e) => setQuantity(Number(e.target.value))}
/>

{/* TOTAL PRICE */}
<p style={{ marginTop: "10px", fontSize: "18px" }}>
  <b>Total Price:</b> ₹{totalPrice}
</p>

{/* BUY BUTTON BELOW */}
<button
  className="details-button"
  style={{ marginTop: "10px" }}
  onClick={handlePurchase}
>
  Buy Now
</button>

            </>
          )}

          <button className="chat-button">Chat</button>
        </div>
      </div>

      <section className="recommendations">
        <h2>Similar Sweets</h2>
        <div className="recommendation-crops">
          {similarSweets.length > 0 ? (
            similarSweets.map((s, index) => (
              <Recommendation key={index} sweet={s} />
            ))
          ) : (
            <p>No similar sweets found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default SweetDetails;
