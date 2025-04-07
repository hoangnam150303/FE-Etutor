import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseApi from "../../hooks/courseApi";

const CoursePage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAllCourse(filter, search, "user");
      console.log(response.data.courses);

      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filter, search]);

  const handleDetailClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="my-5">
      <div className="bg container mx-auto">
        <div className="mx-5">
          <div className="mb-4 flex gap-4">
            <select
              className="p-2 border rounded"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="favorite">Favorite Courses</option>
            </select>
            <input
              type="text"
              className="p-2 border rounded w-full"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((card, index) => (
              <div className="bg-white shadow-md rounded-lg p-2" key={index}>
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={card.image}
                  alt={card.name}
                />
                <div className="p-2">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2 line-clamp-1">
                      {card.name}
                    </h2>
                    <p className="text-gray-700 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs italic">
                      Tutors:{" "}
                      {card.tutors && card.tutors.length > 0
                        ? card.tutors.map((tutor) => tutor.username).join(", ")
                        : "No tutors available"}
                    </p>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDetailClick(card._id)}
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
