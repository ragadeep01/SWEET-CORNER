import { useState,useEffect, useRef } from "react";

import React from "react";

import "../index.css";
import { useNavigate } from "react-router";


function Header({}) {
  const [searchQuery, setSearchQuery] = useState("");

const [dropdownOpen, setDropdownOpen] = useState(false);
const [user, setUser] = useState({ name: "", email: "" });
const navigate = useNavigate();

const dropdownRef = useRef(null);

const handleSearch = (e) => {
  setSearchQuery(e.target.value);
};

const handleKeyPress = (e) => {
  if (e.key === "Enter" && searchQuery.trim() !== "") {
    navigate(`/search?query=${searchQuery}`);
  }
};


  useEffect(() => {
    // Fetch user details from localStorage (or API)
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || { name: "Ram Kumar", email: "ram@gmail.com" };
    setUser(loggedInUser);

    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




  return (
    <header>
      <div className="header-container">
        <div className="header-right">
          <div className="search-container">
            <input
             type="text"
              placeholder='Search "Sweets"'
               className="search-bar"
               value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress} />
            <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="Search" className="search-icon" onClick={() => searchQuery.trim() !== "" && navigate(`/search?query=${searchQuery}`)} />
          </div>

          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="Wishlist" className="icon" style={{ width: "24px", height: "24px" }} onClick={() => navigate("/wishlist")} />

          {/* <img src="/cat_images/chat.png" alt="Chat" className="icon" style={{ width: "24px", height: "24px" }}/> */}
      


          <div className="profile-container" ref={dropdownRef}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Profile" 
              className="icon profile-icon" 
              // onClick={toggleDropdown} 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ border: "1px solid #000", borderRadius: "50%" }} 
            />

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="profile-header">
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" className="profile-img" />
                  <div className="profile-info">
                    <p className="name">{user.name}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </div>
                <a href="#">View Profile</a>
                <a href="#">Settings & Privacy</a>
                <a href="#">Help</a>
                <a href="#">Language</a>
                <a href="#" className="logout" onClick={handleLogout}>Logout</a>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include", // to include the cookie
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    window.location.href = "/"; 
  } catch (err) {
    console.error(err.message);
  }
};
export default Header;
