import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
