import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default LayoutWrapper;