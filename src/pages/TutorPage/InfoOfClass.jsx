import { useParams } from "react-router-dom";
import { Breadcrumb, Card, Button, Table, Space, Modal, Form, Upload, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { DownloadOutlined, UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

const InfoOfClass = () => {
    const { className } = useParams();

    const classInfo = {
        studentName: "Nguyễn Văn A",
        courseName: "ReactJS Basics",
        startDate: "2024-01-10",
        endDate: "2024-06-10",
    };

    const columns = [
        { title: "Lesson", dataIndex: "session", key: "session" },
        {
            title: "PDF Document",
            dataIndex: "pdf",
            key: "pdf",
            render: (text) => (
                <Space>
                    <a href={`/files/${text}`} target="_blank" rel="noopener noreferrer">{text}</a>
                    <Button type="link" icon={<DownloadOutlined />} href={`/files/${text}`} download />
                </Space>
            ),
            width: 350,
        },
        {
            title: "Video lecture",
            dataIndex: "video",
            key: "video",
            render: (text) => (
                <Space>
                    <a href={`/videos/${text}`} target="_blank" rel="noopener noreferrer">{text}</a>
                    <Button type="link" icon={<DownloadOutlined />} href={`/videos/${text}`} download />
                </Space>
            ),
            width: 350,
        },
    ];
    const dataSource = Array.from({
        length: 100,
    }).map((_, i) => ({
        key: i,
        session: `Buổi ${i + 1}`,
        pdf: `Bài giảng ${i + 1}.pdf`,
        video: `Bài giảng ${i + 1}.mp4`,
    }));

    // Modal Upload
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const validationSchema = Yup.object().shape({
        session: Yup.string().required("Please enter number of lessons"),
        pdf: Yup.mixed().required("Please upload PDF file"),
        video: Yup.mixed().required("Please upload Video file"),
    });

    const beforeUploadPDF = (file, setFieldValue, setFileName) => {
        if (file.type !== "application/pdf") {
            message.error("Just accept PDF files!");
            return false;
        }
        setFieldValue("pdf", file);
        setFileName(file.name);
        return false;
    };

    const beforeUploadVideo = (file, setFieldValue, setFileName) => {
        if (!file.type.startsWith("video/")) {
            message.error("Just accept Video files!");
            return false;
        }
        setFieldValue("video", file);
        setFileName(file.name);
        return false;
    };

    return (
        <div>
            <Content className="mx-2 lg:mx-5">
                <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
                    <Breadcrumb.Item>Tutor</Breadcrumb.Item>
                    <Breadcrumb.Item href="/tutor/list-classes">Classes</Breadcrumb.Item>
                    <Breadcrumb.Item className="text-[#f18966] font-bold">{className}</Breadcrumb.Item>
                </Breadcrumb>

                <div className="top-body">
                    <Card title={<h2 className="text-xl font-semibold text-[#1890ff]">Class information</h2>} className="mb-5 shadow-md">
                        <div className="grid grid-cols-2 gap-y-3 gap-x-5 text-base">
                            <p><strong className="text-gray-600">Students:</strong> {classInfo.studentName}</p>
                            <p><strong className="text-gray-600">ClassClass:</strong> {className}</p>
                            <p><strong className="text-gray-600">Start date:</strong> {classInfo.startDate}</p>
                            <p><strong className="text-gray-600">CourseCourse:</strong> {classInfo.courseName}</p>
                            <p><strong className="text-gray-600">End date:</strong> {classInfo.endDate}</p>
                        </div>
                    </Card>
                </div>

                <div className="bottom-body">
                    <div className="flex justify-end">
                        <Button type="primary" className="mb-3" onClick={showModal}>Upload File</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{
                            x: 'max-content',
                            y: 55 * 5,
                        }}
                    />
                </div>
            </Content>

            <Modal title="Upload File" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Formik
                    initialValues={{ session: "", pdf: null, video: null }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("Uploaded Data:", values);
                        message.success("Upload successful!");
                        setSubmitting(false);
                        setIsModalOpen(false);
                    }}
                >
                    {({ setFieldValue, handleSubmit, isSubmitting, values }) => {
                        const [pdfName, setPdfName] = useState(null);
                        const [videoName, setVideoName] = useState(null);

                        return (
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Form.Item label="Lesson">
                                    <Field
                                        name="session"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm transition-all outline-none focus:ring-1 focus:ring-[#1890ff] focus:border-[#1890ff] hover:border-[#40a9ff] disabled:bg-gray-100 disabled:text-gray-400 invalid:border-red-500"
                                        placeholder="Enter number of Lessons"
                                    />
                                    <div className="h-2 error">
                                        <ErrorMessage name="session" component="div" className="text-red-500" />
                                    </div>
                                </Form.Item>

                                <Form.Item label="PDF Document">
                                    <div className="flex items-center">
                                        <Upload
                                            beforeUpload={(file) => beforeUploadPDF(file, setFieldValue, setPdfName)}
                                            showUploadList={false}
                                        >
                                            <Button icon={<UploadOutlined />}>Select PDF file</Button>
                                        </Upload>
                                        {pdfName && (
                                            <div className="ml-2 flex items-center">
                                                <span>{pdfName}</span>
                                                <Button type="link" icon={<CloseCircleOutlined />} onClick={() => {
                                                    setFieldValue("pdf", null);
                                                    setPdfName(null);
                                                }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-2 error">
                                        <ErrorMessage name="pdf" component="div" className="text-red-500" />
                                    </div>
                                </Form.Item>

                                <Form.Item label="Video lecture">
                                    <div className="flex items-center">
                                        <Upload
                                            beforeUpload={(file) => beforeUploadVideo(file, setFieldValue, setVideoName)}
                                            showUploadList={false}
                                        >
                                            <Button icon={<UploadOutlined />}>Select Video file</Button>
                                        </Upload>
                                        {videoName && (
                                            <div className="ml-2 flex items-center">
                                                <span>{videoName}</span>
                                                <Button type="link" icon={<CloseCircleOutlined />} onClick={() => {
                                                    setFieldValue("video", null);
                                                    setVideoName(null);
                                                }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-2 error">
                                        <ErrorMessage name="video" component="div" className="text-red-500" />
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isSubmitting} block>
                                        Upload
                                    </Button>
                                </Form.Item>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </div>
    );
};

export default InfoOfClass;
