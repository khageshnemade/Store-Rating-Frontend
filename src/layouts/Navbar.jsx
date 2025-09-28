import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import AdminNavbar from "./AdminNavbar";
import OwnerNavbar from "./OwnerNavbar";
import UserNavbar from "./UserNavbar";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored)?.user : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("reduxState");
    setUser(null);
    navigate("/login");
  };

  switch (user?.role) {
    case "ADMIN":
      return <AdminNavbar onLogout={handleLogout} />;
    case "OWNER":
      return <OwnerNavbar onLogout={handleLogout} />;
    case "USER":
      return <UserNavbar onLogout={handleLogout} />;
    default:
      return <PublicNavbar />;
  }
};

export default Navbar;
