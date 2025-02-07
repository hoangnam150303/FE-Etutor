import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TutorHeader from "../components/Headers/TutorHeader";

const TutorLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="m-2 rounded-lg font-cairoRegular flex flex-col lg:flex-row bg-gradient-to-br from-[#e6dbcd] via-[#eee5da] to-transparent">
            <TutorHeader onToggle={handleToggleSidebar} isOpen={isSidebarOpen} />
            <div className={`p-4 duration-300 ${isSidebarOpen ? 'w-full lg:w-4/5 xl:w-5/6' : 'w-full lg:w-11/12'}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default TutorLayout;