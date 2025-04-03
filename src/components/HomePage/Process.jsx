import React from "react";

const process = [
  {
    id: 1,
    title: "TIẾP NHẬN",
    description: "Trung tâm tiếp nhận thông tin đăng kí tư vấn",
    image:
      "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668834/number-1_wjiana.webp",
  },
  {
    id: 2,
    title: "TƯ VẤN ",
    description: "Trung tâm tư vấn gặp mặt trực tiếp tại nhà",
    image:
      "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668834/number-2_vsp4jo.webp",
  },
  {
    id: 3,
    title: "DẠY THỬ",
    description: "Sắp xếp giáo viên dạy thử một đến hai buổi",
    image:
      "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668835/number-3_x11hal.webp",
  },
  {
    id: 4,
    title: "ĐĂNG KÍ",
    description: "Tiếp nhận đăng kí khóa học để học chính thức",
    image:
      "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668835/number-4_cjwfcw.webp",
  },
  {
    id: 5,
    title: "DẠY CHÍNH THỨC",
    description: "Sắp xếp giáo viên dạy sau khi đăng kí học chính thức",
    image:
      "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668836/number-5_seqoxl.webp",
  },
  {
    id: 6,
    title: "HỖ TRỢ",
    description: "Trung tâm hỗ trợ dịch vụ trong suốt quá trình học",
    image:
      "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668836/number-6_zt95vm.webp",
  },
];

const Process = () => {
  return (
    <div className="container mx-auto mt-4">
      <div>
        <h2 className="text-center text-xl sm:text-xl lg:text-4xl font-bold mb-6">
          QUY TRÌNH ĐĂNG KÝ THUÊ GIA SƯ
        </h2>
        <div className="w-full h-50 overflow-hidden rounded-md mb-4">
          <img
            src="https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668835/banner-2_sumg0x.webp"
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
