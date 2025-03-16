import {
  Breadcrumb,
  Select,
  Input,
  Modal,
  Button,
  Form as AntForm,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import blogApi from "../../hooks/blogApi";
import Item from "antd/es/list/Item";
import { UploadOutlined } from "@ant-design/icons";
import courseApi from "../../hooks/courseApi";
import classApi from "../../hooks/classApi";

const { Search } = Input;

const TutorBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classess, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    fetchBlogsByUser();
  }, [searchTerm, filter]);
  const fetchBlogsByUser = async () => {
    try {
      const response = await blogApi.getAllBlogByUser(searchTerm, filter);
      setBlogs(response.data.blog);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCoursesandClasses = async () => {
    try {
      const courses = await courseApi.getAllCourse("", "", "user");
      setCourses(courses.data.courses);
      const classes = await classApi.getClassByTutor();
      setClasses(classes.data.classValid);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/tutor/blog/${id}`);
  };

  // Tạo Blog
  const [isModalOpenBlog, setIsModalOpenBlog] = useState(false);
  const showModalBlog = () => {
    fetchCoursesandClasses();
    setIsModalOpenBlog(true);
  };
  const handleOkBlog = () => {
    setIsModalOpenBlog(false);
  };
  const handleCancelBlog = () => {
    setIsModalOpenBlog(false);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title phải có ít nhất 5 ký tự")
      .max(100, "Title không được quá 100 ký tự")
      .required("Vui lòng nhập Title"),
    content: Yup.string()
      .min(10, "Content phải có ít nhất 10 ký tự")
      .required("Vui lòng nhập content"),
    courseName: Yup.string()
      .min(1, "Vui lòng chọn ít nhất một khóa học")
      .required("Vui lòng chọn ít nhất một khóa học"),
    className: Yup.string()
      .min(1, "Vui chọn ít nhất một lớp học")
      .required("Vui chọn ít nhất một lớp học"),
    image: Yup.mixed().required("Vui lòng chọn hình anh"),
    file: Yup.mixed().required("Vuiź chọn video"),
  });

  return (
    <div className="">
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Blog 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="">
          <div className="top-body flex justify-between items-center">
            <div className="top-body-search">
              <Search
                placeholder="input search text"
                allowClear
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: 500,
                }}
              />
            </div>
            <div className="top-body-select">
              <Select
                placeholder="Filter"
                style={{
                  width: 200,
                }}
                onChange={(value) => setFilter(value)}
                options={[
                  {
                    value: "all",
                    label: "All",
                  },
                  {
                    value: "popular",
                    label: "Popular",
                  },
                  {
                    value: "deleted",
                    label: "Deleted",
                  },
                  {
                    value: "active",
                    label: "Active",
                  },
                ]}
              />
            </div>
            <div className="top-body-create_blog">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded duration-500"
                onClick={showModalBlog}
              >
                Create Blog
              </button>
            </div>
            <Modal
              footer={null}
              title="Create Blog"
              open={isModalOpenBlog}
              onOk={handleOkBlog}
              onCancel={handleCancelBlog}
              width={750}
            >
              <Formik
                initialValues={{
                  title: "",
                  content: "",
                  courseName: "",
                  className: "",
                  image: [],
                  file: [],
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const response = await blogApi.postCreateBlog(values);
                    if (response.status === 200) {
                      resetForm();
                      setIsModalOpenBlog(false);
                      fetchBlogsByUser();
                      message.success("Blog added successfully");
                    }
                  } catch (error) {
                    console.log(error);
                    message.error(error);
                  }
                }}
              >
                {({ setFieldValue, values, handleSubmit }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="font-bold">Title</label>
                      <Field name="title" as={Input} />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="font-bold">Content</label>
                      <Field name="content" as={TextArea} rows={5} />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="font-bold">Course name</label>
                      <Field name="courseName">
                        {({ field, form }) => (
                          <>
                            <Select
                              style={{ width: "100%" }}
                              onChange={(value) =>
                                form.setFieldValue("courseName", value)
                              }
                              value={form.values.courseName}
                              options={courses.map((course) => ({
                                label: course.name,
                                value: course._id,
                              }))}
                            />
                            {form.errors.courseName &&
                              form.touched.courseName && (
                                <div className="text-red-500 text-sm">
                                  {form.errors.courseName}
                                </div>
                              )}
                          </>
                        )}
                      </Field>
                    </div>

                    {/* Class */}
                    <div>
                      <label className="font-bold">Class name</label>
                      <Field name="className">
                        {({ field, form }) => (
                          <>
                            <Select
                              style={{ width: "100%" }}
                              onChange={(value) =>
                                form.setFieldValue("className", value)
                              }
                              value={form.values.className}
                              options={classess.map((cls) => ({
                                label: cls.name,
                                value: cls._id,
                              }))}
                            />
                            {form.errors.className &&
                              form.touched.className && (
                                <div className="text-red-500 text-sm">
                                  {form.errors.className}
                                </div>
                              )}
                          </>
                        )}
                      </Field>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Image Course">Image Course</label>
                      <Item
                        name="upload"
                        label="Upload"
                        valuePropName="image"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          name="image"
                          listType="picture"
                          beforeUpload={(file) => {
                            setFieldValue("image", file);
                            return false; // Ngăn chặn upload tự động
                          }}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to upload
                          </Button>
                        </Upload>
                      </Item>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="File">File</label>
                      <Item
                        name="upload"
                        label="Upload"
                        valuePropName="file"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          name="file"
                          listType="file"
                          beforeUpload={(file) => {
                            setFieldValue("file", file);
                            return false; // Ngăn chặn upload tự động
                          }}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to upload
                          </Button>
                        </Upload>
                      </Item>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Modal>
          </div>
          <div className="bottom-body my-5">
            <div className="list-blog">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogs.map((blog, index) => (
                  <div className="" key={blog?._id}>
                    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all border border-gray-200">
                      <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {blog?.title}
                      </h2>
                      <img src={blog?.image} alt="" />
                      <p className="text-gray-600 mb-3 line-clamp-4">
                        {blog?.content}
                      </p>
                      <p className="text-sm text-gray-500 mb-5">
                        Author:{" "}
                        <span className="font-semibold text-red-500">
                          {blog?.author?.username}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mb-5">
                        Class:{" "}
                        <span className="font-semibold text-red-500">
                          {blog?.classId?.name}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mb-5">
                        Course:{" "}
                        <span className="font-semibold text-red-500">
                          {blog?.courseId?.name}
                        </span>
                      </p>
                      <div className="flex justify-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded duration-500"
                          onClick={() => handleDetailClick(blog?._id)}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default TutorBlog;
