import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import LoginPage from '../pages/Login/LoginPage';
import OTPPage from '../pages/Register/OTPPage';
import RegisterPage from '../pages/Register/RegisterPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default AppRoutes;
