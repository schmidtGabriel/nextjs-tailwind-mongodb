import React, { useState } from "react";
import { useRouter } from "next/router";

// components
import Navbar from "../components/Navbars/Navbar";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import FooterAdmin from "../components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
      <AdminSidebar>
        <div className="">
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
          <div className="py-3">
            {children}
            {/* <FooterAdmin /> */}
          </div>
        </div>
      </AdminSidebar>
    </>
  );
}
