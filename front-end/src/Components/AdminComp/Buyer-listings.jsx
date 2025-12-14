import React, { useEffect, useState } from "react";

const BuyerOfferings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch("/api/pending", {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch pending orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartPreparing = async (orderId) => {
    try {
      const res = await fetch(`/api/${orderId}/start`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Order moved to Preparing stage!");
      fetchPendingOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="buyer-offerings">
      <h2>Pending Orders</h2>

      {orders.length === 0 ? (
        <p>No pending orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="buyer-card">
            
            {/* Sweet Image */}
            <img
  src={
    order.sweetSnapshot?.image
      ? `http://localhost:3000${order.sweetSnapshot.image}`
      : "/sweet.png"
  }
  alt={order.sweetSnapshot?.name}
  className="buyer-image"
/>

            <div className="buyer-details">
              <strong>Buyer Name:</strong> {order.customerId?.name}
              <p><strong>Sweet:</strong> {order.sweetSnapshot?.name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> ₹{order.totalAmount}</p>
            </div>

            <div className="buyer-actions">
              <button
                className="accept-btn"
                onClick={() => handleStartPreparing(order._id)}
              >
                Start Preparing
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default BuyerOfferings;
