import React from "react";
import HomeHeader from "../components/Headers/HomeHeader";
import HomePage from "../pages/HomePage/HomePage";

import Outlet from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="bg-white shadow">
      <HomeHeader />
      <div>
        {/* <HomePage /> */}
        <Outlet />
      </div>
    </div>
  );
}
