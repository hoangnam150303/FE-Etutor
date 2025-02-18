import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, Modal, Select, Table, Upload } from "antd";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Content } from "antd/es/layout/layout";
import { UploadOutlined } from "@ant-design/icons";
import Item from "antd/es/list/Item";
import userApi from "../../hooks/useUser";
const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const fetchUsers = async (filter) => {
    const response = await userApi.getAllUser(filter);
    setUsers(response.data);
  };
  const handleStatus = async (id, status) => {
    const response = await userApi.updateStatusUser(id, { status });
    if (response.status === 200) {
      fetchUsers(filter);
    }
  };
  useEffect(() => {
    fetchUsers(filter);
  }, [filter]);
  const handleChange = (value) => {
    setFilter(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phoneNumber: yup
      .string()
      .matches(/^\d+$/, "Phone number must be digits only")
      .required("Phone number is required"),
  });

  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: 150,
      render: (avatar) => (
        <img
          src={avatar}
          alt="Avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },

    {
      title: "Age",
      width: 75,
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (
        <div>
          {record.status ? (
            <button
              className="text-white bg-red-500 px-2 py-1 rounded-md mb-2"
              onClick={() => handleStatus(record.key, false)}
            >
              Block
            </button>
          ) : (
            <button
              className="text-white bg-green-500 px-2 py-1 rounded-md"
              onClick={() => handleStatus(record.key, true)}
            >
              Unblock
            </button>
          )}
        </div>
      ),
    },
  ];

  const dataSource = users.map((user, i) => ({
    key: user._id,
    name: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    avatar: user.avatar,
    role: user.role,
    lastLogin: user.lastLogin,
    status: user.status,
  }));

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 text-base">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            User Management 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <Button
            onClick={showModal}
            className="text-green-800 px-4 py-1 border border-green-800"
          >
            Create Tutor
          </Button>
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
                value: "student",
                label: "Student",
              },
              {
                value: "tutor",
                label: "Tutor",
              },
              {
                value: "block",
                label: "Block",
              },
              {
                value: "unBlock",
                label: "Unblock",
              },
            ]}
            className=""
          />
          <Modal
            title="New Tutor"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                phoneNumber: "",
                avatar: null,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const response = await userApi.postCreateTutor(values);
                if (response.status === 200) {
                  console.log(response.data);
                }
                setTimeout(() => {
                  resetForm();
                  setIsModalOpen(false);
                }, 100);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <FormikForm className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="username">Username</label>
                    <Field as={Input} name="username" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Field as={Input} name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <Field as={Input.Password} name="password" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field as={Input} name="phoneNumber" />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="avatar">Avatar</label>
                    <Upload
                      beforeUpload={() => false} // Ngăn upload lên server ngay lập tức
                      onChange={(info) => setFieldValue("avatar", info.file)}
                    >
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 text-white px-4 py-2"
                    >
                      {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                  </div>
                </FormikForm>
              )}
            </Formik>
          </Modal>
        </div>
        <div className="data-user-table my-2">
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{
              x: "max-content",
              y: "calc(100vh - 300px)",
            }}
          />
        </div>
      </Content>
    </div>
  );
};

export default UserPage;
