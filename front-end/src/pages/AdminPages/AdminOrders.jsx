import React, { useState, useEffect } from "react";
import Navbar from "../../Components/AdminComp/Navbar";



const SweetOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const pendingRes = await fetch("/api/pending", { credentials: "include" });
      const preparingRes = await fetch("/api/preparing", { credentials: "include" });
      const deliveredRes = await fetch("/api/delivered", { credentials: "include" });

      const pending = await pendingRes.json();
      const preparing = await preparingRes.json();
      const delivered = await deliveredRes.json();

      setOrders([
        ...pending.map(o => ({ ...o, section: "pending" })),
        ...preparing.map(o => ({ ...o, section: "preparing" })),
        ...delivered.map(o => ({ ...o, section: "delivered" })),
      ]);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleStartPreparing = async (id) => {
    try {
      const res = await fetch(`/api/${id}/start`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Started preparing!");
      fetchAllOrders();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeliver = async (id) => {
    try {
      const res = await fetch(`/api/${id}/deliver`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Order delivered!");
      fetchAllOrders();
    } catch (error) {
      alert(error.message);
    }
  };

  const renderOrderCard = (order, isPending, isPreparing) => (
    <div key={order._id} className="active-contract-card">
      <div className="active-contracts-content-left">
        <h3><b>Buyer:</b> {order.customerId?.name}</h3>
        <p><b>Sweet:</b> {order.sweetSnapshot?.name}</p>
        <p><b>Quantity Ordered:</b> {order.quantity}</p>
        <p><b>Price:</b> ₹{order.totalAmount}</p>
      </div>

      <div className="active-contracts-content-right">
        <button className="view-btn" onClick={() => setSelectedOrder(order)}>View Details</button>

        {isPending && (
          <button
            className="end-btn"
            onClick={() => handleStartPreparing(order._id)}
          >
            Start Preparing
          </button>
        )}

        {isPreparing && (
          <button
            className="end-btn"
            onClick={() => handleDeliver(order._id)}
          >
            Mark Delivered
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />

      <div className="contracts-page-container">

        {/* PENDING ORDERS */}
        <div className="active-contracts-container">
          <div className="active-contracts-title"><h1>Pending Orders</h1></div>
          <div className="active-contracts-content">
            {orders.filter(o => o.section === "pending").length === 0 ? (
              <p>No pending orders</p>
            ) : (
              orders
                .filter(o => o.section === "pending")
                .map(o => renderOrderCard(o, true, false))
            )}
          </div>
        </div>

        {/* ONGOING (PREPARING) ORDERS */}
        <div className="active-contracts-container">
          <div className="active-contracts-title"><h1>Ongoing Orders</h1></div>
          <div className="active-contracts-content">
            {orders.filter(o => o.section === "preparing").length === 0 ? (
              <p>No ongoing orders</p>
            ) : (
              orders
                .filter(o => o.section === "preparing")
                .map(o => renderOrderCard(o, false, true))
            )}
          </div>
        </div>

        {/* PAST ORDERS */}
        <div className="active-contracts-container">
          <div className="active-contracts-title"><h1>Past Orders</h1></div>
          <div className="active-contracts-content">
            {orders.filter(o => o.section === "delivered").length === 0 ? (
              <p>No past orders</p>
            ) : (
              orders
                .filter(o => o.section === "delivered")
                .map(o => renderOrderCard(o, false, false))
            )}
          </div>
        </div>

        {/* ORDER DETAILS POPUP */}
        {selectedOrder && (
          <div className="profile-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="contract-profile-container" onClick={(e) => e.stopPropagation()}>
              <div className="contract-profile">
                <img
  src={
    selectedOrder.sweetSnapshot?.image
      ? `http://localhost:3000${selectedOrder.sweetSnapshot.image}`
      : "/passport.jpg"
  }
  alt="Sweet"
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
