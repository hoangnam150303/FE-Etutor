import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../hooks/useUser";
import courseApi from "../../hooks/courseApi";
import { Button } from "antd";
import chatApi from "../../hooks/chatApi";

const TutorPage = () => {
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const fetchTutors = async () => {
    try {
      const response = await userApi.getAllUser("tutor", searchTerm, "user");
      setTutors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAllCourse("", "", "user");
      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChat = async (id) => {
    try {
      const response = await chatApi.sendMessage({ message: " " }, id);
      console.log(response);

      if (response.status === 200) {
        navigate("/user/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTutors();
  }, [searchTerm]);
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="my-5">
      <div className="mx-20 mb-5 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="container mx-auto">
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tutors.map((tutor) => {
              // Lọc ra các khóa học mà tutor này giảng dạy
              const tutorCourses = courses.filter((course) =>
                course.tutors.map((t) => t._id).includes(tutor._id)
              );
              console.log(tutorCourses);

              return (
                <div
                  className="bg-white shadow-md hover:shadow-lg rounded-lg m-4 p-4 flex items-center gap-2"
                  key={tutor._id}
                >
                  <div className="rounded-full overflow-hidden w-1/3 h-auto">
                    <img
                      src={tutor.avatar}
                      alt={tutor.username}
                      className="border-2 border-slate-400 size-16 object-cover rounded-full"
                    />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-lg font-bold line-clamp-1">
                      {tutor.username}
                    </h2>
                    <p className="text-gray-700 text-xs my-1 line-clamp-1">
                      {tutor.email}
                    </p>
                    {/* Hiển thị danh sách khóa học */}
                    <div className="flex flex-wrap items-baseline gap-2">
                      {tutorCourses.length > 0 ? (
                        <>
                          {tutorCourses.slice(0, 2).map((course) => (
                            <p
                              key={course._id}
                              className="text-gray-700 text-xs my-2 bg-slate-300 px-2 py-0.5 rounded-xl"
                            >
                              {course.name}
                            </p>
                          ))}
                          {tutorCourses.length > 2 && (
                            <p className="text-gray-500 text-xs italic">
                              ...and more
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-500 text-xs italic">
                          No courses
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => handleChat(tutor._id)}
                      type="primary"
                      className="align-self-end"
                    >
                      Chat
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg bg-slate-100"></div>
    </div>
  );
};

export default TutorPage;
