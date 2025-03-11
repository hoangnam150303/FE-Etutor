import React, { useEffect, useState } from "react";

import { CheckCircleTwoTone, ArrowRightOutlined } from "@ant-design/icons";
import courseApi from "../../hooks/courseApi";

const ServiceCard = ({ key, title, image, detail }) => (
  <div className="w-full h-auto p-6 bg-white rounded-none">
    <div className="w-full h-50 overflow-hidden rounded-md mb-4">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover ease-in duration-300 hover:scale-110"
      />
    </div>
    <div>
      <h3 className="text-2xl sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-center text-blue-900 ">
        {title}
      </h3>
      <span className="flex items-center gap-2">
        <CheckCircleTwoTone /> {detail}
      </span>
    </div>
  </div>
);

const Services = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getAllCourse("", "", "user");
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl sm:text-xl lg:text-4xl font-bold mb-6">
        KHÓA HỌC ĐƯỢC ĐÁNH GIÁ TỐT NHẤT TẠI ĐÀ NẴNG
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <ServiceCard
            key={course._id}
            title={course.name}
            image={course.image}
            detail={course?.description}
          />
        ))}
      </div>
      <div className="w-full">
        <button className="w-2/3 sm:w-1/3 lg:w-1/4 h-14 mx-auto mt-6 bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-full text-xl font-bold flex items-center justify-center gap-2">
          Tìm Hiểu Thêm
          <ArrowRightOutlined
            style={{ fontSize: "24px", fontWeight: "bold" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Services;
