import { Breadcrumb, Button, Modal, Popconfirm, Select, Table } from "antd";
import { createStyles } from 'antd-style';
import { Content } from "antd/es/layout/layout";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

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
    message.success('Click on Yes');
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};

const ClassRegis = () => {

    const { styles } = useStyle();

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // Modal Accept
    const [isModalOpenAccept, setIsModalOpenAccept] = useState(false);

    const showModalAccept = () => {
        setIsModalOpenAccept(true);
    };
    const handleOkAccept = () => {
        setIsModalOpenAccept(false);
    };
    const handleCancelAccept = () => {
        setIsModalOpenAccept(false);
    };

    const columns = [
        {
            title: 'Name class',
            width: 150,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Tutor ID',
            dataIndex: 'tutorId',
            key: 'tutorId',
            width: 100,
        },
        {
            title: 'Student ID',
            width: 100,
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Documents',
            dataIndex: 'documents',
            key: 'documents',
            width: 200,
            fixed: 'left',
            render: (documents) => (
                <div>
                    {documents.map((doc, index) => (
                        <div key={index}>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                View Document
                            </a>
                            <div className="text-gray-500 text-sm">Comment: {doc.comment}</div>
                            <div className="text-gray-500 text-sm">Date: {doc.createDate}</div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Videos',
            dataIndex: 'videos',
            key: 'videos',
            width: 100,
        },
        {
            title: 'Start time',
            dataIndex: 'isStart',
            key: 'isStart',
            width: 150,
        },
        {
            title: 'End time',
            dataIndex: 'isFinish',
            key: 'isFinish',
            width: 150,
        },
        {
            title: 'Time Created',
            dataIndex: 'timestamps',
            key: 'timestamps',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <div>
                <button className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2" onClick={showModalAccept}>Accept</button>
                <Popconfirm
                    title="Delete Class"
                    description="Are you sure to delete this class?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
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
        documents: [
            {
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                comment: 'Comment 1',
                createDate: '2023-06-01',
            }
        ]
    }));

    const { Option } = Select;

    const validationSchema = Yup.object().shape({
        teacher: Yup.string().required("Vui lòng chọn giáo viên"),
        student: Yup.string().required("Vui lòng chọn sinh viên"),
        class: Yup.string().required("Vui lòng chọn lớp học"),
    });

    return (
        <div>
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base '>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>Class Registration 👋🏻</Breadcrumb.Item>
                </Breadcrumb>
                <div className="action-button flex justify-between items-center mb-2 lg:my-2">
                    <Select
                        defaultValue="lucy"
                        style={{
                            width: 200,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },
                            {
                                value: 'disabled',
                                label: 'Disabled',
                                disabled: true,
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
                            x: 'max-content',
                            y: 'calc(100vh - 300px)',
                        }}
                    />
                    <Modal title="Accept Class" open={isModalOpenAccept} onCancel={handleCancelAccept} footer={null}>
                        <Formik
                            initialValues={{ teacher: "", student: "", class: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log("Submitted Values:", values);
                            }}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form className="space-y-4">
                                    <div className="w-full flex justify-between items-baseline">
                                        <label className="block mb-1 w-1/4">Select class</label>
                                        <div className="w-3/4">
                                            <Select
                                                style={{ width: "100%" }}
                                                onChange={(value) => setFieldValue("class", value)}
                                                placeholder="Select class"
                                            >
                                                <Option value="class1">Class 1</Option>
                                                <Option value="class2">Class 2</Option>
                                            </Select>
                                            <div className="h-2 error ml-1">
                                                {errors.class && touched.class && (
                                                    <div className="text-red-500">{errors.class}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-baseline">
                                        <label className="block mb-1 w-1/4">Select a teacher</label>
                                        <div className="w-3/4">
                                            <Select
                                                style={{ width: "100%" }}
                                                onChange={(value) => setFieldValue("teacher", value)}
                                                placeholder="Select a teacher"
                                            >
                                                <Option value="teacher1">Teacher 1</Option>
                                                <Option value="teacher2">Teacher 2</Option>
                                            </Select>
                                            <div className="h-2 error ml-1">
                                                {errors.teacher && touched.teacher && (
                                                    <div className="text-red-500">{errors.teacher}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-baseline">
                                        <label className="block mb-1 w-1/4">Select student</label>
                                        <div className="w-3/4">
                                            <Select
                                                style={{ width: "100%" }}
                                                onChange={(value) => setFieldValue("student", value)}
                                                placeholder="Select student"
                                            >
                                                <Option value="student1">Student 1</Option>
                                                <Option value="student2">Student 2</Option>
                                            </Select>
                                            <div className="h-2 error ml-1">
                                                {errors.student && touched.student && (
                                                    <div className="text-red-500">{errors.student}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button onClick={handleCancelAccept} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                                            Cancel
                                        </Button>
                                        <Button type="primary" htmlType="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                            Create
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