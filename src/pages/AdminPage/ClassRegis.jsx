import {
  Breadcrumb,
  Button,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { createStyles } from "antd-style";
import { Content } from "antd/es/layout/layout";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import classApi from "../../hooks/classApi";
import courseApi from "../../hooks/courseApi";
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

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};
const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

const ClassRegis = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [acceptClass, setAcceptClass] = useState({});
  const [editClass, setEditClass] = useState({});
  const [tutors, setTutors] = useState([]);
  const { styles } = useStyle();

  const handleChange = (value) => {
    setFilter(value);
  };

  // Modal Accept
  const [isModalOpenAccept, setIsModalOpenAccept] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const fetchClasses = async (filter, search) => {
    try {
      const response = await classApi.getAllClass(filter, search);
      console.log(response.data);

      setClasses(response.data.classValid);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDetailCourse = async (classId, id) => {
    try {
      const response = await courseApi.getDetailCourse(classId, id);
      setTutors(response.data.tutors);
    } catch (error) {}
  };
  const handleAcceptClass = async (classId, tutorId) => {
    try {

      const response = await classApi.postAcceptClass(classId, tutorId);
      if (response.status === 200) {
        message.success("Accept successfully");
        fetchClasses(filter, search);
        setIsModalOpenAccept(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showModalAccept = (id) => {
    const validForm = classes.find((item) => item._id === id);
    setAcceptClass(validForm);
    fetchDetailCourse(validForm.courseId._id);
    setIsModalOpenAccept(true);
  };
  const showModalEdit = (id) => {
    const validForm = classes.find((item) => item._id === id);
    setEditClass(validForm);
    fetchDetailCourse(validForm.courseId._id);
    setIsModalOpenEdit(true);
  };

  // edit function
  const handleUpdateClass = async (classId, data) => {
    const response = await classApi.updateClass(classId, data);
    if (response.status === 200) {
      message.success("Update successfully");
      fetchClasses(filter, search);
      setIsModalOpenAccept(false);
    }
  };
  const handleCancelEdit = () => {
    setAcceptClass({});
    setIsModalOpenAccept(false);
  };
  const handleCancelAccept = () => {
    setAcceptClass({});
    setIsModalOpenAccept(false);
  };
  useEffect(() => {
    fetchClasses(filter, search);
  }, [filter, search]);
  const columns = [
    {
      title: "Name class",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Tutor Name",
      dataIndex: "tutorName",
      key: "tutorName",
      width: 100,
    },
    {
      title: "Student Name",
      width: 100,
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Course Name",
      width: 100,
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Time Created",
      dataIndex: "timestamps",
      key: "timestamps",
      width: 150,
    },
    {
      title: "Accepted",
      dataIndex: "isAccepted",
      key: "isAccepted",
      width: 150,
    },
    {
      title: "End time",
      dataIndex: "isFinish",
      key: "isFinish",
      width: 150,
    },
    {
      title: "Time Created",
      dataIndex: "timestamps",
      key: "timestamps",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (
        <div>
          {record.isAccepted ? (
            <button
              className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2"
              onClick={() => showModalAccept(record.key)}
            >
              Update
            </button>
          ) : (
            <button
              className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2"
              onClick={() => showModalAccept(record.key)}
            >
              Accept
            </button>
          )}
        </div>
      ),
    },
  ];
  const dataSource = Array.isArray(classes)
    ? classes.map((item) => ({
        key: item._id,
        name: item.name,
        studentName: item.studentId?.username,
        tutorName: item.tutorId?.username,
        courseName: item.courseId?.name,
        isStart: item?.isStart,
        isFinish: item?.isFinish,
        timestamps: item?.createdAt,
        isAccepted: item?.isAccepted,
      }))
    : [];

  const { Option } = Select;

  const validationSchema = Yup.object().shape({
    tutor: Yup.string().required("Vui lòng chọn giáo viên"),
  });

  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base ">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Class Registration 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="action-button flex justify-between items-center mb-2 lg:my-2">
          <Select
            defaultValue="all"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "isStart",
                label: "Start",
              },
              {
                value: "isFinish",
                label: "Finish",
              },
              {
                value: "regist",
                label: "Regist Class",
              },
            ]}
            className=""
          />
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
          <Modal
            title="Accept Class"
            open={isModalOpenAccept}
            onCancel={handleCancelAccept}
            footer={null}
          >
            <Formik
              initialValues={{ tutor: "", student: "", class: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleAcceptClass(acceptClass._id, values.tutor);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Class name</label>
                    <div className="w-3/4">
                      <span>{acceptClass.name}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Course name</label>
                    <div className="w-3/4">
                      <span>{acceptClass.courseId?.name}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Student name</label>
                    <div className="w-3/4">
                      <span>{acceptClass.studentId?.username}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Select a tutor</label>
                    <div className="w-3/4">
                      <Select
                        style={{ width: "100%" }}
                        onChange={(value) => setFieldValue("tutor", value)}
                        placeholder="Select a tutor"
                      >
                        {tutors.map((tutor) => (
                          <Option key={tutor._id} value={tutor._id}>
                            {tutor.username}
                          </Option>
                        ))}
                      </Select>
                      <div className="h-2 error ml-1">
                        {errors.tutor && touched.tutor && (
                          <div className="text-red-500">{errors.tutor}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleCancelAccept}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Accept
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>

          {/* edit class */}
          <Modal
            title="Edit Class"
            open={isModalOpenEdit}
            onCancel={handleCancelEdit}
            footer={null}
          >
            <Formik
              // Sử dụng tutor mặc định từ acceptClass, nếu không có thì mặc định là ""
              initialValues={{
                tutor: editClass.tutorId?._id,
              }}
              // Nếu acceptClass có thể thay đổi sau khi Modal được mở, bạn nên bật enableReinitialize
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleUpdateClass(editClass._id, values);
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Class name</label>
                    <div className="w-3/4">
                      <span>{editClass.name}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Course name</label>
                    <div className="w-3/4">
                      <span>{editClass.courseId?.name}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Student name</label>
                    <div className="w-3/4">
                      <span>{editClass.studentId?.username}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-baseline">
                    <label className="block mb-1 w-1/4">Select a tutor</label>
                    <div className="w-3/4">
                      <Select
                        name="tutor"
                        style={{ width: "100%" }}
                        onChange={(value) => setFieldValue("tutor", value)}
                        value={values.tutor} // Giá trị hiện tại của tutor từ Formik state
                      >
                        {tutors.map((tutor) => (
                          <Select.Option key={tutor._id} value={tutor._id}>
                            {tutor.username}
                          </Select.Option>
                        ))}
                      </Select>
                      <div className="h-2 error ml-1">
                        {errors.tutor && touched.tutor && (
                          <div className="text-red-500">{errors.tutor}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleCancelAccept}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Accept
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
      </Content>
    </div>
  );
};

export default ClassRegis;
