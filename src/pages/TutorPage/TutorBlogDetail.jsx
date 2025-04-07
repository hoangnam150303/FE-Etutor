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
import { useParams } from "react-router-dom";
import blogApi from "../../hooks/blogApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Item from "antd/es/list/Item";
import { UploadOutlined } from "@ant-design/icons";
import courseApi from "../../hooks/courseApi";
import classApi from "../../hooks/classApi";

const TutorBlogDetail = () => {
  const { id } = useParams();
  const [blogSelected, setBlogSelected] = useState({});
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    courseName: "",
    className: "",
    image: "",
    file: "",
  });
  const fetchBlogDetail = async () => {
    try {
      const response = await blogApi.getBlogById(id);

      setBlogSelected(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  // Update Blog
  const [isModalOpenUpdateBlog, setIsModalOpenUpdateBlog] = useState(false);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const showModalUpdateBlog = () => {
    setInitialValues({
      title: blogSelected.title || "",
      content: blogSelected.content || "",
      courseName: blogSelected.courseId._id || "",
      classId: blogSelected.classId._id || "",
      image: blogSelected.image || "",
      file: blogSelected.file || "",
    });
    fetchCoursesandClasses();
    setIsModalOpenUpdateBlog(true);
  };
  const handleOkUpdateBlog = () => {
    setIsModalOpenUpdateBlog(false);
  };
  const handleCancelUpdateBlog = () => {
    setIsModalOpenUpdateBlog(false);
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
  const handleStatusBlog = async () => {
    try {
      const response = await blogApi.updateStatusBlog(blogSelected._id);
      if (response.status === 200) {
        message.success("Cập nhật trang thái blog thành công");
        fetchBlogDetail();
      }
    } catch (error) {
      console.log(error);
      message.error("Cập nhật trang thái blog không thành công");
    }
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
    classId: Yup.string()
      .min(1, "Vui chọn ít nhất một lớp học")
      .required("Vui chọn ít nhất một lớp học"),
  });

  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Blog
          </Breadcrumb.Item>
          <Breadcrumb.Item> {blogSelected.title} 👋🏻</Breadcrumb.Item>
        </Breadcrumb>
        <body className="">
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {blogSelected.title}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Class name: {blogSelected.classId?.name}
              </div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Course name: {blogSelected.courseId?.name}
              </div>
              <span className="text-gray-500 text-sm">
                {blogSelected?.createdAt}
              </span>
            </div>
            <div>
              <img src={blogSelected?.image} alt="Image of blog" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              {blogSelected?.content}
            </p>
            <div>
              {blogSelected.file ? (
                <a
                  className="text-blue-500 font-semibold"
                  href={blogSelected?.file}
                >
                  Click here to see file
                </a>
              ) : null}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
                onClick={() => showModalUpdateBlog()}
              >
                Update
              </button>
              {blogSelected.isActive ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-10"
                  onClick={() => handleStatusBlog()}
                >
                  Inactive
                </button>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10"
                  onClick={() => handleStatusBlog()}
                >
                  Active
                </button>
              )}
            </div>
          </div>

          {/* Modal Update Blog */}
          <Modal
            title="Update Blog"
            open={isModalOpenUpdateBlog}
            onOk={handleOkUpdateBlog}
            onCancel={handleCancelUpdateBlog}
            footer={null}
          >
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                console.log("Submitted values:", values);
                const response = await blogApi.updateBlog(id, values);
                if (response.status === 200) {
                  message.success("Blog updated successfully");
                  setIsModalOpenUpdateBlog(false);
                  resetForm();
                  fetchBlogDetail();
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
                        <Select
                          style={{ width: "100%" }}
                          value={values.courseName}
                          options={(courses || []).map((course) => ({
                            value: course._id,
                            label: course.name,
                          }))}
                          onChange={(value) =>
                            form.setFieldValue("courseName", value)
                          }
                        />
                      )}
                    </Field>
                  </div>

                  <div>
                    <label className="font-bold">Class name</label>
                    <Field name="classId">
                      {({ field, form }) => (
                        <Select
                          style={{ width: "100%" }}
                          value={values.classId}
                          options={(classes || []).map((classs) => ({
                            value: classs._id,
                            label: classs.name,
                          }))}
                          onChange={(value) =>
                            form.setFieldValue("classId", value)
                          }
                        />
                      )}
                    </Field>
                  </div>

                  <div>
                    <label className="font-bold">Image</label>
                    <Upload
                      beforeUpload={(file) => {
                        setFieldValue("image", file);
                        return false; // Ngăn Ant Design tự động upload
                      }}
                      showUploadList={false} // Không hiển thị danh sách file đã chọn
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    {values.image && (
                      <img
                        src={
                          typeof values.image === "string"
                            ? values.image
                            : URL.createObjectURL(values.image)
                        }
                        alt="Preview"
                        className="mt-2 max-w-full h-32 object-cover"
                      />
                    )}
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold">File</label>
                    <Upload
                      beforeUpload={(file) => {
                        setFieldValue("file", file);
                        return false;
                      }}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                    {values.file && (
                      <p className="mt-2 text-sm">
                        Selected file: {values.file.name}
                      </p>
                    )}
                    <ErrorMessage
                      name="file"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        </body>
      </Content>
    </div>
  );
};

export default TutorBlogDetail;
