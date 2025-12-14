import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";    

const SweetOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const res = await fetch("/api/my", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log("Fetched user orders:", data);
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch user orders:", err);
    }
  };
   console.log(selectedOrder);

  // -------------------- REUSABLE CARD --------------------
  const renderOrderCard = (order) => (
    <div key={order._id} className="active-contract-card">
      <div className="active-contracts-content-left">
        <h3><b>Sweet:</b> {order.sweetSnapshot?.name}</h3>
        <p><b>Category:</b> {order.sweetSnapshot?.category}</p>
        <p><b>Quantity Ordered:</b> {order.quantity}</p>
        <p><b>Total Amount:</b> ₹{order.totalAmount}</p>
      </div>

      <div className="active-contracts-content-right">
        <button className="view-btn" onClick={() => setSelectedOrder(order)}>
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      {/* <Navbar /> */}

      <div className="contracts-page-container">

        {/* -------------------- PENDING ORDERS -------------------- */}
        <div className="active-contracts-container">
          <div className="active-contracts-title">
            <h1>Pending Orders</h1>
          </div>

          <div className="active-contracts-content">
            {orders.filter(o => o.status === "pending").length === 0 ? (
              <p>No pending orders</p>
            ) : (
              orders
                .filter(o => o.status === "pending")
                .map(renderOrderCard)
            )}
          </div>
        </div>

        {/* -------------------- ONGOING ORDERS (PREPARING) -------------------- */}
        <div className="active-contracts-container">
          <div className="active-contracts-title">
            <h1>Ongoing Orders</h1>
          </div>

          <div className="active-contracts-content">
            {orders.filter(o => o.status === "preparing").length === 0 ? (
              <p>No ongoing orders</p>
            ) : (
              orders
                .filter(o => o.status === "preparing")
                .map(renderOrderCard)
            )}
          </div>
        </div>

        {/* -------------------- PAST ORDERS (DELIVERED) -------------------- */}
        <div className="active-contracts-container">
          <div className="active-contracts-title">
            <h1>Past Orders</h1>
          </div>

          <div className="active-contracts-content">
            {orders.filter(o => o.status === "completed").length === 0 ? (
              <p>No past orders</p>
            ) : (
              orders
                .filter(o => o.status === "completed")
                .map(renderOrderCard)
            )}
          </div>
        </div>

        {/* -------------------- ORDER DETAILS MODAL -------------------- */}
        {selectedOrder && (
          <div className="profile-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="contract-profile-container" onClick={(e) => e.stopPropagation()}>
              
              <div className="contract-profile">
                <img
  src={
    selectedOrder.sweetSnapshot?.image
      ? `http://localhost:3000${selectedOrder.sweetSnapshot.image}`
      : "/sweet.png"
  }
  alt={selectedOrder.sweetSnapshot?.name}
/>

              </div>
              

              <div className="name">
                <h1><b>{selectedOrder.sweetSnapshot?.name}</b></h1>
                <p><b>Category:</b> {selectedOrder.sweetSnapshot?.category}</p>
                <p><b>Ordered Quantity:</b> {selectedOrder.quantity}</p>
                <p><b>Total Price:</b> ₹{selectedOrder.totalAmount}</p>
                <p><b>Status:</b> {selectedOrder.status}</p>
              </div>

              <div className="profile-chat">
                <button>Chat</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SweetOrdersPage;
