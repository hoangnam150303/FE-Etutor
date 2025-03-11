import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseApi from "../../hooks/courseApi";

const CoursePage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAllCourse(filter, search, "user");
      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const handleDetailClick = () => {
    navigate(`/course/:id`);
  };

  return (
    <div className="my-5">
      <div className="bg container mx-auto">
        <div className="mx-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((card, index) => (
              <div className="bg-white shadow-md rounded-lg p-2" key={index}>
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={card.image}
                  alt={card.title}
                />
                <div className="p-2">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2 line-clamp-1">
                      {card.title}
                    </h2>
                    <p className="text-gray-700 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs italic">
                      Tutor : {card.tutors}
                      <span className="text-sm text-gray-700 font-semibold not-italic">
                        {card.tutor}
                      </span>
                    </p>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDetailClick()}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
