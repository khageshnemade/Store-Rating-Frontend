import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import StoreRating from "./components/Common/StoreRating";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import OwnerDashboard from "./components/Owner/OwnerDashboard";
import AdminStore from "./components/Admin/AdminStore";
import AddStore from "./components/Admin/AddStore";
import AdminUsers from "./components/Admin/AdminUsers";
import AddUser from "./components/Admin/AddUser";
import UserDashboard from "./components/User/UserDashboard";
import NotFound from "./pages/NotFound";
import ChangePassword from "./components/Common/ChangePassword";
import { useSelector } from "react-redux";
import Stores from "./components/Common/Stores";


const Routers = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = user !== null;
  const userRole = user ? user.role : null;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="blog" element={<Blog />} />

        {/* Protected Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={["ADMIN"]}
            />
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="stores" element={<AdminStore />} />
          <Route path="stores/add" element={<AddStore />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/add" element={<AddUser />} />
        </Route>

        {/* Protected Owner Routes */}
        <Route
          path="owner"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={["OWNER"]}
            />
          }
        >
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="stores" element={<Stores />} />
          <Route path="stores/rating" element={<StoreRating />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Protected User Routes */}
        <Route
          path="user"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={["USER"]}
            />
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="stores/rating" element={<StoreRating />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routers;
