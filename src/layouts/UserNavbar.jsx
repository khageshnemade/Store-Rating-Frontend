import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";

const UserNavbar = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center h-14 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/logos/store.png" alt="Logo" className="h-12 w-auto" />
          </Link>
          <span className="text-sm text-gray-700">Hi, User</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <NavItem to="/user/dashboard">Dashboard</NavItem>
          <NavItem to="/user/change-password">Change Password</NavItem>
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-3 py-1.5 rounded-full hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col items-center space-y-3 py-4 bg-white shadow-md border-t border-gray-200">
          <NavItem
            to="/user/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavItem>
          <NavItem to="/user/change-password" onClick={() => setIsMobileMenuOpen(false)}>
            Change Password
          </NavItem>
        
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40" />
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmLogout}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default UserNavbar;
