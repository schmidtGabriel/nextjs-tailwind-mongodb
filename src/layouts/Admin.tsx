import React, { useState } from "react";
import { useRouter } from 'next/router'

// components
import Navbar from "../components/Navbars/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// import FooterAdmin from "../components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar >
      <div className="">
      <Navbar/>
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
      </Sidebar>
     
    </>
  );
}
