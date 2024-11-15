import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Dashboard from './pages/Dashboard';
import ManageMembers from './pages/ManageMembers';
import ManageBooks from './pages/ManageBooks';
import LoginPage from './pages/LoginPage';  // Import the LoginPage
import RegisterPage from './pages/RegisterPage';  // Import the RegisterPage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-members" element={<ManageMembers />} />
          <Route path="manage-books" element={<ManageBooks />} />
        </Route>

        {/* Add routes for Login and Register */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
