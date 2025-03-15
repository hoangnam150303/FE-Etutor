import {
  Breadcrumb,
  Button,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  Upload,
} from "antd";
import { createStyles } from "antd-style";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextArea from "antd/es/input/TextArea";
import Item from "antd/es/list/Item";
import { UploadOutlined } from "@ant-design/icons";
import courseApi from "../../hooks/courseApi";
import userApi from "../../hooks/useUser";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const confirm = async (id) => {
  try {
    const response = await courseApi.postDeleteCourse(id);
    if (response.status === 200) {
      message.success("Delete course successfully");
    }
  } catch (error) {}
};
const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Courses = () => {
  const { styles } = useStyle();
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [tutors, setTutors] = useState([]);
  const [courseEdit, setCourseEdit] = useState({});
  const handleChange = (value) => {
    setFilter(value);
  };
  const fetchCourses = async (filter) => {
    try {
      const response = await courseApi.getAllCourse(filter, search, "admin");
      setCourses(response.data.courses);
      console.log(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTutors = async () => {
    try {
      const tutors = await userApi.getAllUser("tutor", "");
      setTutors(tutors.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCourses(filter);
  }, [filter]);
  // Add Course
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
    fetchTutors();
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleAddCourse = async (values, { setSubmitting }) => {
    try {
      const response = await courseApi.postCreateCourse(values);
      if (response.status === 200) {
        message.success("Course added successfully");
        setIsModalOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      message.error("Failed to add course");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Course

  const showModalEdit = (id) => {
    const validCourse = courses.find((course) => course._id === id);
    setCourseEdit(validCourse);
    setIsModalOpenEdit(true);
    fetchTutors();
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleEditCourse = async (values, { setSubmitting }) => {
    try {
      const response = await courseApi.postUpdateCourse(courseEdit._id, values);
      if (response.status === 200) {
        message.success("Course added successfully");
        setIsModalOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      message.error("Failed to add course");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Name Course",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (image) => <img src={image} alt="" />,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
    },
    {
      title: "Tutors",
      dataIndex: "tutors",
      key: "tutors",
      width: 100,
    },
    {
      title: "Classes",
      dataIndex: "classes",
      key: "classes",
      width: 150,
    },
    {
      title: "Time stamps",
      dataIndex: "timeStamps",
      key: "timeStamps",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (
        <div>
          <Button
            className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2"
            onClick={() => showModalEdit(record.key)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete course"
            description="Are you sure to delete this course?"
            onConfirm={() => confirm(record.key)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const dataSource = courses.map((course, index) => ({
    key: course?._id,
    name: course?.name,
    image: course?.image,
    description: course?.description,
    tutors: course?.tutors.map((tutor) => tutor.username).join(", "),
    classes: course?.classes,
    timeStamps: course.createdAt,
  }));

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    image: yup.mixed().required("Image is required"),
    tutors: yup.array().min(1, "Select at least one tutor").required(),
  });

  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base ">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Courses 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="action-button flex justify-between items-center mb-2 lg:my-2">
          <Select
            defaultValue="All"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: "All",
                label: "All",
              },
              {
                value: "isDeleted",
                label: "Deleted",
              },
              {
                value: "isActive",
                label: "Active",
              },
              {
                value: "favorite",
                label: "Favorite",
              },
            ]}
            className=""
          />
          <Button
            className="text-green-800 px-4 py-1 rounded-md border border-green-800"
            onClick={showModalAdd}
          >
            Add Course
          </Button>
          <Modal
            title="New Course"
            open={isModalOpenAdd}
            onCancel={handleCancelAdd}
            footer={null}
          >
            <Formik
              initialValues={{
                name: "",
                description: "",
                image: "",
                tutors: [],
              }}
              validationSchema={validationSchema}
              onSubmit={handleAddCourse}
            >
              {({ setFieldValue, errors, touched, values }) => (
                <Form>
                  <div className="mb-3">
                    <label>Name</label>
                    <Field
                      name="name"
                      as={Input}
                      onBlur={(e) => setFieldValue("name", e.target.value)}
                    />
                    <div className="h-2 error">
                      {touched.name && errors.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <Field
                      name="description"
                      as={TextArea}
                      rows={4}
                      onBlur={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                    />
                    <div className="h-2 error">
                      {touched.description && errors.description && (
                        <div className="text-red-500">{errors.description}</div>
                      )}
                    </div>
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
                    <label>Tutors</label>
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      onChange={(value) => setFieldValue("tutors", value)}
                      value={values.tutors}
                      options={tutors.map((tutor) => ({
                        label: tutor.username,
                        value: tutor._id,
                      }))}
                    />
                    <div className="h-2 error">
                      {touched.tutors && errors.tutors && (
                        <div className="text-red-500">{errors.tutors}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleCancelAdd}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Create
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
        <div className="data-user-table my-2">
          <Table
            className={styles.customTable}
            columns={columns}
            dataSource={dataSource}
            scroll={{
              x: "max-content",
              y: "calc(100vh - 300px)",
            }}
          />
        </div>
      </Content>

      {/* Edit Course */}
      <Modal
        title="Edit Course"
        open={isModalOpenEdit}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Formik
          initialValues={{
            name: courseEdit.name || "",
            description: courseEdit?.description || "",
            image: courseEdit?.image || "",
            tutors: courseEdit?.tutors || [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleEditCourse}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <div className="mb-3">
                <label>Name</label>
                <Field
                  name="name"
                  as={Input}
                  onBlur={(e) => setFieldValue("name", e.target.value)}
                />
                <div className="h-2 error">
                  {touched.name && errors.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label>Description</label>
                <Field
                  name="description"
                  as={TextArea}
                  rows={4}
                  onBlur={(e) => setFieldValue("description", e.target.value)}
                />
                <div className="h-2 error">
                  {touched.description && errors.description && (
                    <div className="text-red-500">{errors.description}</div>
                  )}
                </div>
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
                    defaultFileList={
                      courseEdit?.image
                        ? [
                            {
                              uid: "-1",
                              name: "Course Image",
                              url: courseEdit.image,
                            },
                          ]
                        : []
                    }
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Item>
              </div>
              <div className="mb-3">
                <label>Tutors</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  value={values.tutors.map(
                    (tutor) =>
                      // Nếu giá trị là tên, tìm ObjectId tương ứng; nếu là ObjectId, giữ nguyên
                      tutors.find((t) => t.username === tutor)?._id || tutor
                  )}
                  onChange={(selectedValues) => {
                    // Nếu không thay đổi tutors, thì giữ nguyên giá trị cũ
                    const updatedTutors =
                      selectedValues.length === 0
                        ? values.tutors
                        : selectedValues.map(
                            (value) =>
                              tutors.find((t) => t.username === value)?._id ||
                              value
                          );
                    setFieldValue("tutors", updatedTutors);
                  }}
                  options={tutors.map((tutor) => ({
                    label: tutor.username,
                    value: tutor._id,
                  }))}
                />
                <div className="h-2 error">
                  {touched.tutors && errors.tutors && (
                    <div className="text-red-500">{errors.tutors}</div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Courses;
