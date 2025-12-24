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
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route 
          path="/sweetmanagement" 
          element={
            <ProtectedRoute allowedRoles={['Seller']}>
              <SweetMan/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contracts" 
          element={
            <ProtectedRoute allowedRoles={['Seller']}>
              <Farmercontract/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Admin" 
          element={
            <ProtectedRoute allowedRoles={['Seller']}>
              <Adminhome/>
            </ProtectedRoute>
          } 
        />

 
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['Buyer']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute allowedRoles={['Buyer']}>
              <SearchResults/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/details" 
          element={
            <ProtectedRoute allowedRoles={['Buyer']}>
              <RecommendationDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/category/:categoryName" 
          element={
            <ProtectedRoute allowedRoles={['Buyer']}>
              <CategoryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute allowedRoles={['Buyer']}>
              <ContractsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;