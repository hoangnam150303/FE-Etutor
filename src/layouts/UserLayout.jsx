import React, { useState } from 'react'
import UserHeader from '../components/Headers/UserHeader';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    
    return (
        <div className="m-2 rounded-lg font-cairoRegular flex flex-col lg:flex-row bg-gradient-to-br from-[#e6dbcd] via-[#eee5da] to-transparent">
            <UserHeader onToggle={handleToggleSidebar} isOpen={isSidebarOpen} />
            <div className={`p-4 duration-300 ${isSidebarOpen ? 'w-full lg:w-4/5 xl:w-5/6' : 'w-full lg:w-11/12'}`}>
                <Outlet />
            </div>
        </div>
    );
}