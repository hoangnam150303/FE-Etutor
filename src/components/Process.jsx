import React from "react";
import banner2 from "../assets/images/banner-2.webp";
import number1 from "../assets/images/number-1.webp";
import number2 from "../assets/images/number-2.webp";
import number3 from "../assets/images/number-3.webp";
import number4 from "../assets/images/number-4.webp";
import number5 from "../assets/images/number-5.webp";
import number6 from "../assets/images/number-6.webp";

const process = [
    {
        id: 1,
        title: "TIẾP NHẬN",
        description: "Trung tâm tiếp nhận thông tin đăng kí tư vấn",
        image: number1
    },
    {
        id: 2,
        title: "TƯ VẤN ",
        description: "Trung tâm tư vấn gặp mặt trực tiếp tại nhà",
        image: number2
    },
    {
        id: 3,
        title: "DẠY THỬ",
        description: "Sắp xếp giáo viên dạy thử một đến hai buổi",
        image: number3
    },
    {
        id: 4,
        title: "ĐĂNG KÍ",
        description: "Tiếp nhận đăng kí khóa học để học chính thức",
        image: number4
    },
    {
        id: 5,
        title: "DẠY CHÍNH THỨC",
        description: "Sắp xếp giáo viên dạy sau khi đăng kí học chính thức",
        image: number5
    },
    {
        id: 6,
        title: "HỖ TRỢ",
        description: "Trung tâm hỗ trợ dịch vụ trong suốt quá trình học",
        image: number6
    }
]

const Process = () => {
    return (
        <div className="container mx-auto mt-4">
            <div>
                <h2 className="text-center text-xl sm:text-xl lg:text-4xl font-bold mb-6">QUY TRÌNH ĐĂNG KÝ THUÊ GIA SƯ</h2>
                <div className="w-full h-50 overflow-hidden rounded-md mb-4">
                    <img
                        src={banner2}
                        className="w-full h-full object-cover ease-in duration-300 hover:scale-110"
                    />
                </div>
                <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {process.map((process) => (
                        <div
                            key={process.id}
                            className="p-6 bg-white rounded-md flex flex-col items-center text-center"
                        >
                            <img
                                src={process.image}
                                className="w-24 h-24 object-contain mb-4"
                                alt={process.title}
                            />
                            <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                            <p className="text-base">{process.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Process;