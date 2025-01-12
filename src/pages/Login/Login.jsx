import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/'); // Quay lại trang Home
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your password"
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="w-full p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition duration-200"
                        >
                            <i className="fab fa-google mr-2"></i> Login with Google
                        </button>

                        <button
                            type="button"
                            className="w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            <i className="fab fa-apple mr-2"></i> Login with Apple
                        </button>

                        <button
                            onClick={goHome}
                            className="w-full p-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
                        >
                            Back to Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}