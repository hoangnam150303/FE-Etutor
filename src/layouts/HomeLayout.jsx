import React from 'react';
import HomeHeader from "../components/Headers/HomeHeader";
import HomePage from "../pages/HomePage/HomePage";

export default function HomeLayout() {

    return (
        <div className="bg-white shadow">
            <HomeHeader />
            <div>
                <HomePage />
            </div>
        </div>
    )
}
