// Filename - NotFoundPage.js

import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://www.toponseek.com/wp-content/uploads/2024/07/nguyen-nhan-cach-khac-phuc-loi-404-not-found-0.png')`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600">404 Error</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <Button type="primary" className="mt-6" onClick={() => navigate("/")}>
          Go Back to HomePage
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
