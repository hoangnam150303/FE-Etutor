import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, Modal, Select, Table, Upload } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { createStyles } from "antd-style";
import { Content } from "antd/es/layout/layout";
import { UploadOutlined } from "@ant-design/icons";
import Item from "antd/es/list/Item";
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

const UserPage = () => {
  const { styles } = useStyle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const fetchUsers = async (filter) => {
    const response = await userApi.getAllUser(filter);

    setUsers(response.data);
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
    avatar: yup
      .string()
      .url("Avatar must be a valid URL")
      .required("Avatar URL is required"),
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
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 150,
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
      filters: [
        {
          text: "Student",
          value: "student",
        },
        {
          text: "Tutor",
          value: "tutor",
        },
      ],
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
      render: () => (
        <div>
          <button className="text-white bg-red-500 px-2 py-1 rounded-md mb-2">
            Block
          </button>
          <button className="text-white bg-green-500 px-2 py-1 rounded-md">
            Unblock
          </button>
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
    address: `London, Park Lane no. ${i}`,
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
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base ">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            User Management 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="active-button flex justify-between items-center">
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
                value: "tutor",
                label: "Tutor",
              },
              {
                value: "student",
                label: "Student",
              },
            ]}
            className="mb-2 lg:my-2"
          />
          <Button
            className="text-green-800 px-4 py-1 rounded-md border border-green-800"
            onClick={showModal}
          >
            Create Tutor
          </Button>
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
                avatar: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
                setIsModalOpen(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="username">Username</label>
                    <Field
                      as={Input}
                      name="username"
                      type="text"
                      className="border p-2 w-full"
                    />
                    <div className="div-error h-2">
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      className="border p-2 w-full"
                    />
                    <div className="div-error h-2">
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <Field
                      as={Input}
                      name="password"
                      type="password"
                      className="border p-2 w-full"
                    />
                    <div className="div-error h-2">
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field
                      as={Input}
                      name="phoneNumber"
                      type="text"
                      className="border p-2 w-full"
                    />
                    <div className="div-error h-2">
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="avatar">Avatar</label>
                    <Item
                      name="upload"
                      label="Upload"
                      valuePropName="avatar"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="avatar"
                        action="/upload.do"
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to upload
                        </Button>
                      </Upload>
                    </Item>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      {isSubmitting ? "Creating..." : "Create"}
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
    </div>
  );
};

export default UserPage;
