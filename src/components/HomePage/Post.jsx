import React, { useState } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const posts = [
  {
    image:
      "https://vtiacademy.edu.vn/upload/images/anh-link/muc-luong-full-stack-developer.png",
    date: "05/01/2024",
    title: "Review khóa học Lập trình Web cơ bản tại ETutor",
    description:
      "Khóa học phù hợp với người mới bắt đầu, cung cấp nền tảng HTML, CSS, JavaScript. Giảng viên hỗ trợ nhiệt tình, nội dung dễ hiểu.",
  },
  {
    image: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
    date: "12/02/2024",
    title: "Trải nghiệm khóa học Python nâng cao tại ETutor",
    description:
      "Khóa học đi sâu vào xử lý dữ liệu, API và ứng dụng thực tế. Phù hợp cho những bạn đã có kiến thức cơ bản về Python.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXeYGtxwIGs4Zgzb_NwO17t2JZq5uPpJ2-yQ&s",
    date: "20/03/2024",
    title: "Khóa học ReactJS thực chiến tại ETutor có gì đặc biệt?",
    description:
      "Tập trung vào kỹ năng thực tế: dự án CRUD, kết nối API, routing và Redux. Học viên được hướng dẫn từng bước để triển khai một app hoàn chỉnh.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NhWs8yuw_CZRiLNtmUtrcpyXPVTXC8vcHg&s",
    date: "28/03/2024",
    title: "Có nên học khóa Java cơ bản tại ETutor?",
    description:
      "Nếu bạn đang muốn bắt đầu với lập trình hướng đối tượng, khóa học Java này là lựa chọn hợp lý với nội dung chi tiết và các bài tập thực hành.",
  },
  {
    image: "https://miro.medium.com/v2/resize:fit:899/0*ZNfVl9qpPv4BLPo-.png",
    date: "01/04/2024",
    title: "Khóa học DevOps tại ETutor: Học CI/CD, Docker, và hơn thế nữa",
    description:
      "Một chương trình học bài bản cho các bạn muốn tìm hiểu DevOps. Giảng viên có kinh nghiệm, nội dung từ cơ bản đến nâng cao.",
  },
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
            slidesToShow={3} // Hiển thị 3 bài viết trên một lần quay
            afterChange={(current) => setCurrentSlide(current)}
            dots={false} // Tắt nút tròn
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
            <button onClick={goToPrev} className=" text-black p-2">
              <LeftOutlined />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button onClick={goToNext} className="text-black p-2">
              <RightOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
