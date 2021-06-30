import React, { useState } from "react";
import { useRouter } from 'next/router'

// components
import Navbar from "../components/Navbars/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
// import FooterAdmin from "../components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar >
      <div className="">
      <Navbar/>
        <div className="py-3">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
      </Sidebar>
     
    </>
  );
}
