import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
        </main>
      <div className="py-4">
        {" "}
        {/* 👈 Add vertical padding here */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
