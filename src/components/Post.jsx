import React, { useState } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const posts = [
    {
        image: "https://placehold.co/600x400",
        date: "09/06/2020",
        title: "Danh sách các trường Tiểu học công lập ở Biên Hòa hiện nay",
        description: "Nhằm hỗ trợ quý phụ huynh trong việc lựa chọn trường lớp 1 cho con...",
    },
    {
        image: "https://placehold.co/600x400",
        date: "15/06/2020",
        title: "Top #10 trung tâm luyện thi đại học hàng đầu Biên Hòa 2024",
        description: "Kỳ thi đại học là một trong những cột mốc quan trọng nhất trong cuộc...",
    },
    {
        image: "https://placehold.co/600x400",
        date: "03/06/2024",
        title: "Tiêu chí để đánh giá trung tâm gia sư uy tín và chất lượng",
        description: "Việc lựa chọn trung tâm gia sư uy tín cho con là điều trăn trở...",
    },
    {
        image: "https://placehold.co/600x400",
        date: "10/07/2021",
        title: "Những điều cần biết khi chọn trường mầm non cho con",
        description: "Chọn trường mầm non cho con là một quyết định quan trọng của các bậc phụ huynh...",
    },
    {
        image: "https://placehold.co/600x400",
        date: "22/08/2022",
        title: "Lợi ích của việc học ngoại ngữ từ sớm",
        description: "Học ngoại ngữ từ sớm mang lại nhiều lợi ích cho trẻ em, giúp phát triển tư duy và kỹ năng giao tiếp...",
    }
];

// Component PostCard
const PostCard = ({ image, date, title, description }) => {
    return (
        <div className="w-4/5 h-auto mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <span className="bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded">
                        ĐỌC GÌ HÔM NAY
                    </span>
                </div>
                <div className="text-gray-500 text-sm mb-2">
                    <i className="far fa-clock"></i> {date}
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <a href="#" className="text-blue-600 font-semibold">
                    Xem Thêm <i className="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    );
};

// Component chính App
const Post = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = React.createRef();

    // Hàm chuyển tới slide tiếp theo
    const goToNext = () => {
        carouselRef.current.next();
    };

    // Hàm chuyển tới slide trước
    const goToPrev = () => {
        carouselRef.current.prev();
    };

    return (
        <div className="py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                    BÀI VIẾT MỚI NHẤT CỦA CHÚNG TÔI
                </h2>
                <div className="relative">
                    <Carousel
                        ref={carouselRef}
                        slidesToShow={3}  // Hiển thị 3 bài viết trên một lần quay
                        afterChange={(current) => setCurrentSlide(current)}
                        dots={false}  // Tắt nút tròn
                        draggable
                        effect="scrollx"
                        className="transition-all duration-500 ease-in-out justify-center"
                    >
                        {posts.map((post, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <PostCard
                                    image={post.image}
                                    date={post.date}
                                    title={post.title}
                                    description={post.description}
                                />
                            </div>
                        ))}
                    </Carousel>
                    {/* Nút chuyển slide */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                        <button
                            onClick={goToPrev}
                            className=" text-black p-2"
                        >
                            <LeftOutlined />
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                        <button
                            onClick={goToNext}
                            className="text-black p-2"
                        >
                            <RightOutlined />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
