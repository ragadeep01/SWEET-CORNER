import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav-container">
        <div className="nav-content">
        <div className="logo-container">
            <h1 className="logo-text">Sweet-Corner</h1>
        </div>
        <div className="nav-links">
          <Link to="/Admin">Home</Link>
          <Link to="/sweetmanagement">Sweet Management</Link>
          {/* <Link to="/profile">Profile</Link> */}
          <button onClick={handleLogout} className="logout">Logout</button>

        </div>
        </div>
    </div> 
  )
}
const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include", 
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    window.location.href = "/"; 
  } catch (err) {
    console.error(err.message);
  }
};


export default Navbar