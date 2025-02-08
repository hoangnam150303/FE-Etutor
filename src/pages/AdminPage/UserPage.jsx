import React, { useState } from "react";
import { Breadcrumb, Button, Input, Modal, Select, Table, Upload, Form } from "antd";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { UploadOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phoneNumber: yup.string().matches(/^\d+$/, "Phone number must be digits only").required("Phone number is required"),
    avatar: yup.mixed().required("Avatar is required"),
});

const UserPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Full Name',
            width: 150,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 150,
        },
        {
            title: 'Age',
            width: 75,
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 100,
            filters: [
                {
                    text: 'Student',
                    value: 'student',
                },
                {
                    text: 'Tutor',
                    value: 'tutor',
                },
            ],
        },
        {
            title: 'Time Created',
            dataIndex: 'timeCreated',
            key: 'timeCreated',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <div>
                <button className="text-white bg-red-500 px-2 py-1 rounded-md mb-2">Block</button>
                <button className="text-white bg-green-500 px-2 py-1 rounded-md">Unblock</button>
            </div>,
        },
    ];
    
    const dataSource = Array.from({
        length: 50,
    }).map((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    }));

    return (
        <div>
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 text-base'>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>User Management 👋🏻</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex justify-between items-center">
                    <Button onClick={showModal} className="text-green-800 px-4 py-1 border border-green-800">
                        Create Tutor
                    </Button>
                    <Modal title="New Tutor" open={isModalOpen} onCancel={handleCancel} footer={null}>
                        <Formik
                            initialValues={{ username: "", email: "", password: "", phoneNumber: "", avatar: null }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                console.log("Form submitted:", values);
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
                                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <Field as={Input} name="email" />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <Field as={Input.Password} name="password" />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <Field as={Input} name="phoneNumber" />
                                        <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="avatar">Avatar</label>
                                        <Upload
                                            beforeUpload={() => false} // Ngăn upload lên server ngay lập tức
                                            onChange={(info) => setFieldValue("avatar", info.file)}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
                                        <ErrorMessage name="avatar" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2">Cancel</Button>
                                        <Button type="primary" htmlType="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2">
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
                            x: 'max-content',
                            y: 'calc(100vh - 300px)',
                        }}
                    />
                </div>
            </Content>
        </div>
    );
};

export default UserPage;
