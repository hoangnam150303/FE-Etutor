import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import review1 from "../assets/images/review-1.webp";
import review2 from "../assets/images/review-2.webp";
import review3 from "../assets/images/review-3.webp";

const experience = [
    {
        id: 1,
        name: "Trần Văn Toàn",
        job: "Kinh doanh tự do",
        feedback:
            "Anh quan sát thấy con vui hơn mỗi khi được học với gia sư. Con chăm chỉ hơn, thích làm bài tập hơn và đã tạo được thói quen học tập mỗi ngày. Bé hỏi lại ngay mỗi khi không hiểu. Do đó kết quả học tập cũng được cải thiện dần qua từng ngày.",
        image: review1,
    },
    {
        id: 2,
        name: "Nguyễn Thị Mai",
        job: "Nhân viên văn phòng",
        feedback:
            "Nhờ trung tâm mà bé nhà chị tiến bộ lắm. Bé mất căn bản môn toán, mà hiện tại không những đã nắm lại kiến thức cơ bản mà còn được điểm khá tốt. Mặc dù chưa có điểm 10 nhưng điểm trung bình môn toán HK1 đã trên 8.0 rồi.",
        image: review2, // Thay bằng ảnh thực tế
    },
    {
        id: 3,
        name: "Trần Thị Nga",
        job: "Bác sĩ Nha KhoaKhoa",
        feedback:
            "Gia sư trung tâm rất nhiệt tình trong việc giúp đỡ và hỗ trợ bé. Thay đổi tính cách của bé nhà chị rất nhiều, gia sư Cường là giáo viên rất tinh tế và tận tâm. Chị chọn lựa trung tâm vì không chỉ gia sư mà cả đội ngũ làm việc rất chuyên nghiệp.",
        image: review3, // Thay bằng ảnh thực tế
    },
];

const Experience = () => {
    const carouselRef = useRef(null); // Tạo ref để điều khiển Carousel
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleDotClick = (index) => {
        setCurrentSlide(index); // Cập nhật slide hiện tại
        carouselRef.current.goTo(index); // Chuyển slide
    };

    return (
        <div className="py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                    TRẢI NGHIỆM THỰC TẾ CỦA KHÁCH HÀNG ĐÃ SỬ DỤNG DỊCH VỤ
                </h2>
                <Carousel
                    ref={carouselRef}
                    afterChange={setCurrentSlide}
                    dots={false}
                    draggable={true} // Bật tính năng kéo chuột qua lại
                    effect="scrollx" // Hiệu ứng cuộn ngang khi kéo chuột
                    className="transition-all duration-500 ease-in-out"
                >
                    {experience.map((experience) => (
                        <div
                            key={experience.id}
                            className="select-none cursor-pointer"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
                                <img
                                    src={experience.image}
                                    alt={experience.name}
                                    className="w-full h-auto max-w-xs mx-auto mb-4" // Responsive cho hình ảnh
                                />
                                <div>
                                    <p className="text-lg italic text-gray-700 max-w-lg mx-auto">
                                        "{experience.feedback}"
                                    </p>
                                    <h4 className="mt-4 text-xl font-semibold text-blue-800">
                                        {experience.name}
                                    </h4>
                                    <p className="text-blue-600">{experience.job}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <div className="flex justify-center mt-6">
                    {experience.map((_, index) => (
                        <button
                            key={index}
                            className={`w-4 h-4 rounded-full mx-1 ${index === currentSlide
                                ? "bg-blue-600"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
