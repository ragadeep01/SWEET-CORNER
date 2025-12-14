




import React from "react";
import Navbar from "../../Components/AdminComp/Navbar";
import { useNavigate } from "react-router-dom";
import '../../Adminstyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'; 

const services = [
  {
    id: 1,
    title: "Sweet Management",
    description: "Add, edit, and manage all sweet items in your shop effortlessly.",
    image: "sweet_management.png",
    path: "/sweetmanagement",
    icon: <FontAwesomeIcon icon={faCandyCane} />,
  },
];

const Adminhome = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <Navbar />

      {/* Reduced main image height */}
      <div className="head-content" style={{ height: "250px" }}>  
        <img 
          src="welcomeimage.jpg" 
          alt="sweets" 
          style={{ height: "100%", objectFit: "cover", width: "97%" }}
        />
        <p className="text-overlay">
          <span style={{color:"#fefefe", fontFamily: "cursive"}}>Manage All Sweet Items</span> 
          <br/> 
          <span style={{color:"#ffef0aff", fontFamily: "sans-serif"}}>from One Dashboard</span>
        </p>
      </div>

      <div className="f-services-grid" style={{ justifyContent: "center" }}>
        {services.map((service) => (
          
          <div
            key={service.id}
            className="f-service-card"
            onClick={() => service.path && navigate(service.path)}
            style={{
              cursor: service.path ? "pointer" : "default",
              width: "500px",
              height: "162px",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #beff4dff",
              backgroundColor: "#e7ffe6ff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
          >

            {/* Image removed */}
            {/* <img src={service.image} alt={service.title} /> */}

            <div className="f-service-content">
              <h3 style={{ fontSize: "26px", fontWeight: "700", color: "#0a0f02ba" }}>
                {service.title}
              </h3>
              <p style={{ fontSize: "17px", marginTop: "10px", color: "#7a4c00" }}>
                {service.description}
              </p>
            </div>

          </div>

        ))}
      </div>
    </div>
  );
};

export default Adminhome;