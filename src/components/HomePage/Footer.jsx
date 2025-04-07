import { FacebookOutlined, InstagramOutlined, TwitterOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5 text-xl">
                {/* Liên hệ */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-4">LIÊN HỆ</h3>
                    <p>Địa chỉ: 193 Nguyễn Lương Bằng, Hòa Khánh, Đà Nẵng.</p>
                    <p>Điện thoại: 0906 360 365</p>
                    <p>Email: info@etutor.vn</p>
                    <p>MS: 574689</p>
                </div>

                {/* Dịch vụ */}
                <div>
                    <h3 className="font-bold text-lg mb-4">DỊCH VỤ</h3>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:text-gray-300">Gia sư tiểu học</a></li>
                        <li><a href="#" className="hover:text-gray-300">Gia sư THCS</a></li>
                        <li><a href="#" className="hover:text-gray-300">Gia sư THPT</a></li>
                        <li><a href="#" className="hover:text-gray-300">Gia sư ngoại ngữ</a></li>
                        <li><a href="#" className="hover:text-gray-300">Gia sư tin học</a></li>
                        <li><a href="#" className="hover:text-gray-300">Gia sư năng khiếu</a></li>
                    </ul>
                </div>

                {/* Chính sách */}
                <div>
                    <h3 className="font-bold text-lg mb-6">CHÍNH SÁCH</h3>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:text-gray-300">Hướng dẫn thanh toán</a></li>
                        <li><a href="#" className="hover:text-gray-300">Trung tâm hỗ trợ</a></li>
                        <li><a href="#" className="hover:text-gray-300">Câu hỏi thường gặp</a></li>
                        <li><a href="#" className="hover:text-gray-300">Chính sách bảo mật</a></li>
                    </ul>
                </div>

                {/* Theo dõi */}
                <div>
                    <h3 className="font-bold text-lg mb-4">THEO DÕI</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300">
                            <FacebookOutlined />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <InstagramOutlined />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <TwitterOutlined />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <MailOutlined />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-10 text-sm">
                Copyright 2010 © Trung Tâm Gia Sư Etutor - Đà Nẵng
            </div>
        </footer>
    );
};

export default Footer;
