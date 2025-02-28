import React from "react";
import reactImage from "../../assets/images/React.png";
import ItImage from "../../assets/images/Languages.png";
import JsImage from "../../assets/images/javascript.jpg";
import HtmlImage from "../../assets/images/Html-Css.png";
import NodeImage from "../../assets/images/Node-ExpressJS.png";
import CImage from "../../assets/images/C++.png";
import { CheckCircleTwoTone, ArrowRightOutlined } from "@ant-design/icons";

const services = [
    {
        id: 11,
        title: "Kiến thức nhập môn IT",
        image: ItImage,
        details: [
            "Các kiến thức cơ bản, nền móng của ngành IT",
            "Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng"
        ],
    },
    {
        id: 2,
        title: "Xây dựng Website với ReactJS",
        image: reactImage,
        details: [
            "Biết cách tối ưu hiệu năng ứng dụng",
            "Triển khai dự án React ra Internet",
            "Đủ hành trang tự tin apply đi xin việc"
        ],
    },
    {
        id: 3,
        title: "Lập trình JAVASCRIPT",
        image: JsImage,
        details: [
            "Các kiến thức của Javascript giúp code trở nên tối ưu hơn",
            "Hiểu được cách tư duy nâng cao của các lập trình viên có kinh nghiệm"
        ],
    },
    {
        id: 4,
        title: "HTML CSS từ Zero đến Hero",
        image: HtmlImage,
        details: [
            "Biết cách xây dựng giao diện web với HTML, CSS",
            "Biết cách đặt tên class CSS theo chuẩn BEM",
            "Làm chủ Flexbox khi dựng bố cục website"
        ],
    },
    {
        id: 5,
        title: "NODEJS & EXPERSSJS",
        image: NodeImage,
        details: [
            "Nắm chắc lý thuyết chung trong việc xây dựng web",
            "Xây dựng web với Express bằng kiến thức thực tế"
        ],
    },
    {
        id: 6,
        title: "Lập trình C++ cơ bản, nâng cao",
        image: CImage,
        details: [
            "Nắm được các khái niệm căn cơ của lập trình",
            "Nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên",
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
            KHÓA HỌC ĐƯỢC ĐÁNH GIÁ TỐT NHẤT TẠI ĐÀ NẴNG
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
