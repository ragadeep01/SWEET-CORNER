import React, { useState, useEffect } from "react";
import Navbar from "../../Components/AdminComp/Navbar";
import { useNavigate } from "react-router-dom";
import BuyerOfferings from "../../Components/AdminComp/Buyer-listings";
import AvailableListings from "../../Components/AdminComp/AvailableListings";

const SweetMan = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [crops, setCrops] = useState([]);
useEffect(() => {
  if (user.role !== "admin") {
    navigate("/");
  }
}, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch("api/mysweets", {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch sweets");
        setCrops(data);
      } catch (err) {
        console.error("Error fetching sweets:", err.message);
      }
    };

    fetchCrops();
  }, []);


  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    image: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditing = editingIndex !== null;

    const url = isEditing
      ? `/api/sweets/${crops?.[editingIndex]?._id}`
      : "/api/sweets";
    const method = isEditing ? "PUT" : "POST";

    try {
      const dataToSend = new FormData();

 
      dataToSend.append("name", formData.name);
      dataToSend.append("category", formData.category);
      dataToSend.append("quantity", formData.quantity);
      dataToSend.append("price", formData.price);
      if (formData.image) dataToSend.append("image", formData.image);
      const res = await fetch(url, {
        method,
        credentials: "include",
        body: dataToSend,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message||"Failed to save sweet");

      if (isEditing) {
        const updatedList = [...crops];
        updatedList[editingIndex] = data;
        setCrops(updatedList);
      } else {
        setCrops([...crops, data]);
      }

      resetForm();
    } catch (err) {
      console.error("Error saving sweet:", err.message);
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      price: "",
      image: "",
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const crop = crops[index];
    setFormData({
      name: crop.name,
      category: crop.category,
      quantity: crop.quantity,
      price: crop.price,
      image: "",
    });
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDismiss = async (index) => {
    const cropId = crops[index]._id;
    try {
      const res = await fetch(`/api/sweets/${cropId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setCrops((prev) => prev.filter((crop) => crop._id !== cropId));
    } catch (err) {
      console.error("Error deleting sweet:", err.message);
    }
  };

  return (
    <div className="contract-farming-page">
      <Navbar />
      <div
        className="main-content-container"
        style={{ width: "80%", margin: "0 auto", maxWidth: "1200px" }}
      >
        <div className="content-container">
          <h1>Sweets Management</h1>
          <button className="add-crop-btn" onClick={() => setShowModal(true)}>
            ADD SWEET
          </button>
           <button className="farmer-contracts-btn" onClick={() => navigate("/contracts")}>
                    ORDERS
                </button>
        </div>

        {showModal && (
          <div
            className="c-modal-overlay"
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
          >
            <div
              className="c-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{editingIndex !== null ? "Edit Sweet" : "Add Sweet"}</h2>

              <form className="crop-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Sweet Details</h3>

                  <label>Sweet Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter sweet name"
                  />

                  <label>Category:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Indian Sweets</option>
                    <option>Dry Fruit</option>
                    <option>HALWA</option>
                    <option>SUGAR FREE</option>
                    <option>frozen sweets</option>
                  </select>

                  <label>Quantity Available:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />

                  <label>Price per Unit:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />

                  <label>Upload Image:</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingIndex !== null ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
         <BuyerOfferings />
        <AvailableListings
          crops={crops}
          handleEdit={handleEdit}
          handleDismiss={handleDismiss}
        />
      </div>
    </div>
  );
};

export default SweetMan;
