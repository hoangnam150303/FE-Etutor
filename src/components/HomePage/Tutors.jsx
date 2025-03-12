import React, { useEffect, useState } from "react";
import { CheckCircleTwoTone, ArrowRightOutlined } from "@ant-design/icons";
import userApi from "../../hooks/useUser";

const TutorCard = ({ key, name, image, email }) => (
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
        <li className="flex items-center gap-2">
          <CheckCircleTwoTone />
          {email}
        </li>
      </ul>
    </div>
  </div>
);

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const fetchTutors = async () => {
    try {
      const response = await userApi.getAllUser("tutor", "");
      setTutors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTutors();
  }, []);
  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl sm:text-xl lg:text-4xl font-bold mb-6">
        DANH SÁCH GIA SƯ HÀNG ĐẦU
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutors?.map((tutor) => (
          <TutorCard
            key={tutor?._id}
            name={tutor?.username}
            image={tutor?.avatar}
            email={tutor?.email}
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
export default Tutors;
