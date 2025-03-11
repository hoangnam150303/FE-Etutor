import React from "react";
import tutor1 from "../../assets/images/AvatarDefault.png";
import { CheckCircleTwoTone, ArrowRightOutlined } from "@ant-design/icons";

const tutors = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        image: tutor1,
        subjects: [
            "Lập trình hướng đối tượng (OOP)",
            "Kinh nghiệm giảng dạy 5 năm",
        ],
    },
    {
        id: 2,
        name: "Trần Thị B",
        image: tutor1,
        subjects: [
            "Lập trình C, C++",
            "Chuyên gia phần mềm với hơn 7 năm kinh nghiệm",
        ],
    },
    {
        id: 3,
        name: "Phạm Văn C",
        image: tutor1,
        subjects: [
            "Lập trình Backend với NodeJS, ExpressJS",
            "Đã đào tạo hơn 300 học viên",
        ],
    },
    {
        id: 4,
        name: "Lê Thị D",
        image: tutor1,
        subjects: [
            "Quản trị hệ thống Linux và Windows Server",
            "Kinh nghiệm dạy 5 năm",
        ],
    },
    {
        id: 5,
        name: "Võ Văn E",
        image: tutor1,
        subjects: [
            "Lập trình Web với ReactJS, NodeJS",
            "Giảng viên đại học, hơn 8 năm kinh nghiệm",
        ],
    },
    {
        id: 6,
        name: "Đặng Thị F",
        image: tutor1,
        subjects: [
            "Machine Learning và AI với Python",
            "Kinh nghiệm giảng dạy 5 năm",
        ],
    },
];

const TutorCard = ({ name, image, subjects }) => (
    <div className="w-full h-auto p-6 bg-white rounded-none">
        <div className="w-full h-50 overflow-hidden rounded-md mb-4">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover ease-in duration-300 hover:scale-110"
            />
        </div>
        <div>
            <h3 className="text-2xl sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-center text-blue-900">
                {name}
            </h3>
            <ul className="space-y-2">
                {subjects.map((subject, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <CheckCircleTwoTone />
                        {subject}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const Tutors = () => (
    <div className="container mx-auto">
        <h2 className="text-center text-2xl sm:text-xl lg:text-4xl font-bold mb-6">
            DANH SÁCH GIA SƯ HÀNG ĐẦU
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
                <TutorCard
                    key={tutor.id}
                    name={tutor.name}
                    image={tutor.image}
                    subjects={tutor.subjects}
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

export default Tutors;
