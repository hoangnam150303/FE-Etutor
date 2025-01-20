import React from "react";
import primaryImage from "../assets/images/primary.png";
import secondaryImage from "../assets/images/secondary.webp";
import highschoolImage from "../assets/images/highschool.webp";
import languageImage from "../assets/images/language.webp";
import computerImage from "../assets/images/computer.webp";
import aptitudeImage from "../assets/images/aptitude.webp";
import { CheckCircleTwoTone, ArrowRightOutlined } from "@ant-design/icons";

const services = [
    {
        id: 1,
        title: "GIA SƯ TIỂU HỌC",
        image: primaryImage,
        details: [
            "Gia sư lớp 1, lớp 2, lớp 3, lớp 4, lớp 5",
            "Gia sư tiền tiểu học, luyện chữ đẹp",
        ],
    },
    {
        id: 2,
        title: "GIA SƯ THCS",
        image: secondaryImage,
        details: ["Gia sư lớp 6, lớp 7, lớp 8, lớp 9", "Luyện thi chuyển cấp lên lớp 10"],
    },
    {
        id: 3,
        title: "GIA SƯ THPT",
        image: highschoolImage,
        details: ["Gia sư lớp 10, lớp 11, lớp 12", "Luyện thi tốt nghiệp THPT và đại học"],
    },
    {
        id: 4,
        title: "GIA SƯ NGOẠI NGỮ",
        image: languageImage,
        details: [
            "Gia sư tiếng Anh, tiếng Nhật, tiếng Trung",
            "Dạy tiếng Việt cho người nước ngoài",
        ],
    },
    {
        id: 5,
        title: "GIA SƯ TIN HỌC",
        image: computerImage,
        details: ["Học tin học cơ bản, lập trình", "Chứng chỉ MOS, IC3"],
    },
    {
        id: 6,
        title: "GIA SƯ NĂNG KHIẾU",
        image: aptitudeImage,
        details: [
            "Gia sư nhạc cụ: Piano, Violin, Guitar",
            "Luyện tập và sáng tạo nghệ thuật",
        ],
    },
];

const ServiceCard = ({ title, image, details }) => (
    <div className="w-full h-auto p-6 bg-white rounded-none">
        <div className="w-full h-50 overflow-hidden rounded-md mb-4">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover ease-in duration-300 hover:scale-110"
            />
        </div>
        <div>
            <h3 className="text-2xl sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-center text-blue-900 ">{title}</h3>
            <ul className="space-y-2">
                {details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <CheckCircleTwoTone />
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const Services = () => (
    <div className="container mx-auto">
        <h2 className="text-center text-2xl sm:text-xl lg:text-4xl font-bold mb-6">
            DỊCH VỤ GIA SƯ ĐƯỢC ĐÁNH GIÁ TỐT NHẤT TẠI ĐÀ NẴNG
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    title={service.title}
                    image={service.image}
                    details={service.details}
                />
            ))}
        </div>
        <div className="w-full">
            <button className="w-2/3 sm:w-1/3 lg:w-1/4 h-14 mx-auto mt-6 bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-full text-xl font-bold flex items-center justify-center gap-2">
                Tìm Hiểu Thêm
                <ArrowRightOutlined style={{ fontSize: "24px", fontWeight: "bold" }} />
            </button>
        </div>

    </div>
);

export default Services;
