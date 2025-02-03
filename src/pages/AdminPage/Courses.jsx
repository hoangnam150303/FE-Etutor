import { Breadcrumb, Button, Input, message, Modal, Popconfirm, Select, Table, Upload } from "antd";
import { createStyles } from 'antd-style';
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import imageTest from "../../assets/images/AvatarDefault.png"
import TextArea from "antd/es/input/TextArea";
import Item from "antd/es/list/Item";
import { UploadOutlined } from "@ant-design/icons";

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

const normFile = (e) => {
    console.log('Upload event:', e);
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

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // Add Course
    const showModalAdd = () => {
        setIsModalOpenAdd(true);
    };
    const handleCancelAdd = () => {
        setIsModalOpenAdd(false);
    };

    const handleAddCourse = (values) => {
        setCourses([...courses, values]);
        message.success("Course added successfully");
        setIsModalOpenAdd(false);
    };

    // Edit Course
    const showModalEdit = () => {
        setIsModalOpenEdit(true);
    };
    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    };

    const handleEditCourse = (values) => {
        setCourses([...courses, values]);
        message.success("Course edited successfully");
        setIsModalOpenEdit(false);
    };

    const columns = [
        {
            title: 'Name Course',
            width: 150,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 150,
            render: (image) => <img src={image} alt="" />
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: 'Tutors',
            dataIndex: 'tutors',
            key: 'tutors',
            width: 100,
        },
        {
            title: 'Classes',
            dataIndex: 'classes',
            key: 'classes',
            width: 150,
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            width: 150,
        },
        {
            title: 'Time stamps',
            dataIndex: 'timeStamps',
            key: 'timeStamps',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <div>
                <Button className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2" onClick={showModalEdit}>
                    Edit
                </Button>
                <Popconfirm
                    title="Delete course"
                    description="Are you sure to delete this course?"
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
        image: imageTest,
        description: `Chơi bao nhiêu nhưng em nhắc anh. Em không dễ dàng. Không nên tia em, tia trái banh. Thua game, rời em. Không được lơ là đưa chân quá gần. Hãy kiềm chế nào ! Thua mà 5 lần, em sẽ nằm trên anh (Ý anh là điểm mà !). ${i}`,
        tutors: `Edward King ${i}`,
        classes: `Edward King ${i}`,
        students: `Edward King ${i}`,
        timeStamps: true,
    }));

    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        image: yup.mixed().required("Image is required"),
        tutors: yup.array().min(1, "Select at least one tutor").required(),
        classes: yup.array().min(1, "Select at least one class").required(),
        students: yup.array().min(1, "Select at least one student").required(),
    });

    return (
        <div>
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base '>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>Courses 👋🏻</Breadcrumb.Item>
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
                    <Button className="text-green-800 px-4 py-1 rounded-md border border-green-800" onClick={showModalAdd}>
                        Add Course
                    </Button>
                    <Modal title="New Course" open={isModalOpenAdd} onCancel={handleCancelAdd} footer={null}>
                        <Formik
                            initialValues={{
                                name: "",
                                description: "",
                                image: null,
                                tutors: [],
                                classes: [],
                                students: [],
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
                                            <Upload name="image" action="/upload.do" listType="picture">
                                                <Button icon={<UploadOutlined />}>Click to upload</Button>
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
                                            options={[
                                                { label: "Tutor 1", value: "tutor1" },
                                                { label: "Tutor 2", value: "tutor2" },
                                            ]}
                                        />
                                        <div className="h-2 error">
                                            {touched.tutors && errors.tutors && (
                                                <div className="text-red-500">{errors.tutors}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Classes</label>
                                        <Select
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            onChange={(value) => setFieldValue("classes", value)}
                                            value={values.classes}
                                            options={[
                                                { label: "Class 1", value: "class1" },
                                                { label: "Class 2", value: "class2" },
                                            ]}
                                        />
                                        <div className="h-2 error">
                                            {touched.classes && errors.classes && (
                                                <div className="text-red-500">{errors.classes}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Students</label>
                                        <Select
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            onChange={(value) => setFieldValue("students", value)}
                                            value={values.students}
                                            options={[
                                                { label: "Student 1", value: "student1" },
                                                { label: "Student 2", value: "student2" },
                                            ]}
                                        />
                                        <div className="h-2 error">
                                            {touched.students && errors.students && (
                                                <div className="text-red-500">{errors.students}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button onClick={handleCancelAdd} className="bg-gray-500 text-white px-4 py-2 rounded-md">
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
                </div>
            </Content>

            {/* Edit Course */}
            <Modal title="Edit Course" open={isModalOpenEdit} onCancel={handleCancelEdit} footer={null}>
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        image: null,
                        tutors: [],
                        classes: [],
                        students: [],
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
                                    <Upload name="image" action="/upload.do" listType="picture">
                                        <Button icon={<UploadOutlined />}>Click to upload</Button>
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
                                    options={[
                                        { label: "Tutor 1", value: "tutor1" },
                                        { label: "Tutor 2", value: "tutor2" },
                                    ]}
                                />
                                <div className="h-2 error">
                                    {touched.tutors && errors.tutors && (
                                        <div className="text-red-500">{errors.tutors}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Classes</label>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    onChange={(value) => setFieldValue("classes", value)}
                                    value={values.classes}
                                    options={[
                                        { label: "Class 1", value: "class1" },
                                        { label: "Class 2", value: "class2" },
                                    ]}
                                />
                                <div className="h-2 error">
                                    {touched.classes && errors.classes && (
                                        <div className="text-red-500">{errors.classes}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Students</label>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    onChange={(value) => setFieldValue("students", value)}
                                    value={values.students}
                                    options={[
                                        { label: "Student 1", value: "student1" },
                                        { label: "Student 2", value: "student2" },
                                    ]}
                                />
                                <div className="h-2 error">
                                    {touched.students && errors.students && (
                                        <div className="text-red-500">{errors.students}</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
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