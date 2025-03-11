import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Popconfirm } from "antd";
import courseApi from "../../hooks/courseApi";
import classApi from "../../hooks/classApi";

const CourseDetailOfHome = () => {
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);
  const navigate = useNavigate();

  const fetchDetailCourse = async () => {
    try {
      const response = await courseApi.getDetailCourse(id);
      setCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailCourse();
  }, [id]);

  const handleDetailClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Pop confirm register
  const confirmRegister = async () => {
    try {
      const response = await classApi.postCreateClass(course._id);
      if (response.status === 200) {
        message.success("You have successfully registered for the course!");
      } else {
        message.error("You have already registered for the course!");
      }
    } catch (error) {
      message.error("You have already registered for the course!");
    }
  };
  const cancelRegister = () => {
    message.error("Course registration canceled.");
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="">
      <div className="course-header">
        <div className="relative">
          <img
            src={course.image}
            alt={course.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative bg-sky-300 bg-opacity-75 py-4">
            <div className="container mx-auto">
              <p className="text-white text-sm text-center my-4">
                Home<span> / </span>{" "}
                <span className="text-white">Course Detail</span>
              </p>
              <div className="title-course w-3/4 mx-auto mb-5">
                <h1 className="text-white text-3xl text-center">
                  {course.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto">
          <div className="course-body flex items-start m-5 gap-5">
            <div className="course-body__content w-2/3 px-10 py-5 border border-slate-200 rounded-md shadow-md">
              <div className="tutor_course mx-1">
                <p className="text-slate-500 text-sm">Tutors:</p>
                <div className="flex gap-2 flex-wrap">
                  {course.tutors?.length > 0 ? (
                    course.tutors.map((tutor, index) => (
                      <span
                        key={index}
                        className="text-white bg-slate-300 px-2 py-1 rounded-xl"
                      >
                        {tutor.username}
                      </span>
                    ))
                  ) : (
                    <span className="text-white bg-slate-300 px-2 py-1 rounded-xl">
                      Unknown
                    </span>
                  )}
                </div>
              </div>
              <div className="line h-0.5 w-full bg-slate-100 my-2.5"></div>
              <div className="img_course px-1">
                <img
                  src={course.image}
                  alt={course.name}
                  className="rounded-md my-2"
                />
              </div>
              <div className="my-4 border border-slate-200 rounded-md shadow-sm p-2">
                <h2>{course.description}</h2>
              </div>
              <div className="flex justify-end mx-2">
                <Popconfirm
                  title="Confirm Register"
                  description="Are you sure to register this course?"
                  onConfirm={confirmRegister}
                  onCancel={cancelRegister}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register Course
                  </button>
                </Popconfirm>
              </div>
            </div>
            <div className="course-other w-1/3 border border-gray-100 shadow-lg rounded-xl px-4 py-2">
              <h1 className="text-xl font-semibold">Course other</h1>
              <div className="line h-0.5 w-full bg-slate-100 my-2 mx-auto"></div>
              <div className="list-course">
                {/* You can fetch other courses dynamically if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailOfHome;
