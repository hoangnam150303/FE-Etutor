import React from "react";
import basicImage from "../../assets/images/BasicQualifications.webp";
import advancedImage from "../../assets/images/AdvancedQualifications.webp";
import { ArrowRightOutlined, CheckCircleTwoTone } from "@ant-design/icons";

const supported = [
    {
        id: 1,
        title: "TRÌNH ĐỘ CƠ BẢN",
        detail: [
            "Bị mất gốc, hổng kiến thức, tự ti về bản thân",
            "Lười học, mất tập trung, không yêu thích môn học",
            "Nhút nhát, thiếu phương pháp học tập"
        ],
        image: basicImage,
    },
    {
        id: 2,
        title: "TRÌNH ĐỘ NÂNG CAO",
        detail: [
            "Ôn thi vào trường chuyên, trường điểm",
            "Luyện thi đại học điểm cao, vào trường TOP đầu",
            "Ôn thi chứng chỉ tiếng anh, ôn thi học sinh giỏi"
        ],
        image: advancedImage,
    },
];

const DetailItem = ({ item }) => (
    <li className="flex items-center text-sm">
        <CheckCircleTwoTone className="mr-2" />
        {item}
    </li>
);

const Supported = () => {
    return (
        <div className=" container mx-auto">
            <div className="mb-20 sm:mb-4 xl:mb-20">
                <h2 className="text-center text-xl sm:text-xl lg:text-4xl font-bold mb-6">ĐỐI TƯỢNG HỌC VIÊN MÀ CHÚNG TÔI ĐANG TẬP TRUNG HỖ TRỢ</h2>
                <div className="w-full sm:w-full h-96 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center">
                    {supported.map((support) => (
                        <div key={support.id} className="p-6 bg-white rounded-md flex flex-col items-center justify-center">
                            <div className="w-full h-50 overflow-hidden rounded-md mb-4">
                                <img
                                    src={support.image}
                                    alt={support.title}
                                    className="w-full h-full object-cover ease-in duration-300 hover:scale-110"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-center">{support.title}</h3>
                                <ul className="text-left space-y-2">
                                    {support.detail.map((item) => (
                                        <DetailItem key={item} item={item} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-96 sm:mt-2 lg:mt-60">
                <button className="w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 h-14 bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-full text-xl font-bold flex items-center justify-center gap-2">
                    Đăng kí ngay
                    <ArrowRightOutlined style={{ fontSize: "24px", fontWeight: "bold" }} />
                </button>
            </div>
        </div>
    );
};

export default Supported;
