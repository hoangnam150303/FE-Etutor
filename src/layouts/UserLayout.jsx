import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomePage from "../pages/HomePage/HomePage";

export default function UserLayout() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="text-red-500 text-3xl font-bold">e</div>
                    <div className="text-blue-800 text-xl font-bold">tutor</div>
                    <div className="text-sm text-gray-500 italic">
                        Nâng tầm dịch vụ gia sư
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex space-x-6 text-lg font-medium text-blue-800">
                    <a href="/" className="hover:text-red-500">
                        TRANG CHỦ
                    </a>
                    <a href="/gioi-thieu" className="hover:text-red-500">
                        GIỚI THIỆU
                    </a>
                    <div className="relative group">
                        <a
                            href="/dich-vu"
                            className="hover:text-red-500 flex items-center"
                        >
                            DỊCH VỤ
                            <span className="ml-1">▼</span>
                        </a>
                        {/* Dropdown */}
                        <div className="absolute left-0 top-full hidden group-hover:block bg-white border mt-1 shadow-lg z-10">
                            <a
                                href="/dich-vu/1"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Dịch Vụ 1
                            </a>
                            <a
                                href="/dich-vu/2"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Dịch Vụ 2
                            </a>
                        </div>
                    </div>
                    <a href="/bang-gia" className="hover:text-red-500">
                        BẢNG GIÁ
                    </a>
                    <a href="/tin-tuc" className="hover:text-red-500">
                        TIN TỨC
                    </a>
                    <a href="/tuyen-dung" className="hover:text-red-500 relative">
                        TUYỂN DỤNG
                        <span className="absolute top-0 -right-6 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            HOT
                        </span>
                    </a>
                    <a href="/lien-he" className="hover:text-red-500">
                        LIÊN HỆ
                    </a>
                </nav>

                <div className="">
                    <button
                        className='bg-red-500 text-white px-4 py-2 mr-2'
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                    <button
                        className='bg-red-500 text-white px-4 py-2'
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div>
                <HomePage />
            </div>
        </header>
    )
}
