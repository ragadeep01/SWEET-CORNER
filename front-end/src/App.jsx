import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"

import SweetMan from "./pages/AdminPages/SweetManagement.jsx";
import Farmercontract from "./pages/AdminPages/AdminOrders.jsx";
import Adminhome from "./pages/AdminPages/Home.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import RecommendationDetails from "./pages/RecommendationDetails.jsx";

import CategoryPage from "./pages/CategoryPage.jsx";
import SearchResults from "./pages/SearchResults.jsx";

import ContractsPage from "./pages/OrdersPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/sweetmanagement" element={<SweetMan/>} />
      <Route path="/contracts" element={<Farmercontract/>} />
      <Route path="/Admin" element={<Adminhome/>} />


            <Route path="/dashboard" element={<Dashboard />} />
         
              <Route path="/search" element={<SearchResults/>} />
      
              <Route path="/details" element={<RecommendationDetails />} />
      
              <Route path="/category/:categoryName" element={<CategoryPage />} />
      
           
      
              <Route path="/orders" element={<ContractsPage />} />
      </Routes>
    </Router>
  );
};

export default App;