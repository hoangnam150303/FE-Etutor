import React from "react";
import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const question = [
    {
        title: "1. Trung tâm có được cấp giấy phép hoạt động về lĩnh vực dạy kèm hay chưa?",
        description: "Trung tâm gia sư Etutor chính thức được Bộ công thương cấp giấy phép hoạt động giáo dục về lĩnh vực gia sư dạy kèm tại nhà theo quy định.",
    },
    {
        title: "2. Lịch học có thể sắp xếp theo ý muốn của học sinh và gia đình không?",
        description: "Khi đăng kí thuê dịch vụ gia sư, học viên và phụ huynh hoàn toàn có thể sắp xếp lịch học theo yêu cầu theo mong muốn riêng của mình.",
    },
    {
        title: "3. Có thể yêu cầu đổi gia sư khi cảm thấy chưa phù hợp được không?",
        description: "Hoàn toàn có thể yêu cầu đổi gia sư trong quá trình học khi cảm thấy gia sư không phù hợp với yêu cầu và kì vọng từ phía gia đình học viên.",
    },
    {
        title: "4. Trung tâm có hỗ trợ dịch vụ gia sư sinh viên chuyên ngành sư phạm không?",
        description: "Hiện tại trung tâm chưa hỗ trợ cung cấp dịch vụ gia sư sinh viên sư phạm, chỉ hỗ trợ gia sư là giáo viên dạy tại các trường và giáo viên tự do.Hiện tại trung tâm chưa hỗ trợ cung cấp dịch vụ gia sư sinh viên sư phạm, chỉ hỗ trợ gia sư là giáo viên dạy tại các trường và giáo viên tự do.",
    },
];

const Question = () => {
    return (
        <div>
            <div className="container mx-auto bg-white p-4 sm:p-6">
                {/* Tiêu đề */}
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold  mb-4 sm:mb-6">
                    NHỮNG CÂU HỎI THƯỜNG GẶP KHI THUÊ GIA SƯ TẠI ĐÀ NẴNG
                </h1>

                {/* Ảnh */}
                <div className="w-full h-40 sm:h-50 md:h-60 lg:h-full overflow-hidden rounded-md mb-4">
                    <img
                        src="https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668836/question-A_gzzree.webp"
                        alt="Tutor"
                        className="w-full h-full object-cover ease-in duration-300 hover:scale-110"
                    />
                </div>

                {/* Danh sách câu hỏi */}
                <Collapse
                    accordion
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => (
                        <PlusOutlined
                            rotate={isActive ? 45 : 0}
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    )}
                >
                    {question.map((item, index) => (
                        <Panel
                            header={
                                <span className="text-lg sm:text-xl md:text-2xl">
                                    {item.title}
                                </span>
                            }
                            key={index}
                        >
                            <p className="text-base sm:text-lg">{item.description}</p>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};

export default Question;
