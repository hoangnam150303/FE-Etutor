import React from "react";
import HomeHeader from "../components/Headers/HomeHeader";
import HomePage from "../pages/HomePage/HomePage";

import { Outlet } from "react-router-dom";
import Footer from "../components/HomePage/Footer";

export default function HomeLayout() {
  return (
    <div className="bg-white">
      <div className="shadow">
        <HomeHeader />  
      </div>
      <div>
        {/* <HomePage /> */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
