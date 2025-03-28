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

const TutorBlogDetail = () => {
  const { id } = useParams();
  const [blogSelected, setBlogSelected] = useState({});

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await blogApi.getBlogById(id);
        setBlogSelected(response.data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogDetail();
  }, []);

  // Update Blog
  const [isModalOpenUpdateBlog, setIsModalOpenUpdateBlog] = useState(false);
  const showModalUpdateBlog = () => {
    setIsModalOpenUpdateBlog(true);
  };
  const handleOkUpdateBlog = () => {
    setIsModalOpenUpdateBlog(false);
  };
  const handleCancelUpdateBlog = () => {
    setIsModalOpenUpdateBlog(false);
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10" onClick={showModalUpdateBlog}>
                Update
              </button>
            </div>
          </div>

          {/* Modal Update Blog */}
          <Modal title="Update Blog" open={isModalOpenUpdateBlog} onOk={handleOkUpdateBlog} onCancel={handleCancelUpdateBlog} footer={null}>
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
              onSubmit={(values) => {
                console.log("Submitted values:", values);
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
                          // onChange={(value) =>
                          //   form.setFieldValue("courseName", value)
                          // }
                          // value={form.values.courseName}
                          // options={courses.map((course) => ({
                          //   label: course.name,
                          //   value: course._id,
                          // }))}
                          />
                          {/* {form.errors.courseName &&
                        form.touched.courseName && (
                          <div className="text-red-500 text-sm">
                            {form.errors.courseName}
                          </div>
                        )} */}
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
                          // onChange={(value) =>
                          //   form.setFieldValue("className", value)
                          // }
                          // value={form.values.className}
                          // options={classess.map((cls) => ({
                          //   label: cls.name,
                          //   value: cls._id,
                          // }))}
                          />
                          {/* {form.errors.className &&
                        form.touched.className && (
                          <div className="text-red-500 text-sm">
                            {form.errors.className}
                          </div>
                        )} */}
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
