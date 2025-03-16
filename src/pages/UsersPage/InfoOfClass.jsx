import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Upload,
  message,
} from "antd";
import { Content } from "antd/es/layout/layout";
import {
  DownloadOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import classApi from "../../hooks/classApi";

const InfoClassOfUser = () => {
  const { className } = useParams();
  const id = useParams().id;
  const [classSelected, setClassSelected] = useState({});
  const classInfo = {
    studentName: "Nguyễn Văn A",
    courseName: "ReactJS Basics",
    startDate: "2024-01-10",
    endDate: "2024-06-10",
  };
  const fetchDetailClass = async () => {
    try {
      const response = await classApi.getClassById(id);
      setClassSelected(response.data.classValid);
    } catch (error) {
      console.error("Error fetching class details:", error);
      return null;
    }
  };
  useEffect(() => {
    fetchDetailClass();
  }, [id]);

  const handleFinishClass = async () => {
    try {
      const response = await classApi.finishClass(id);
      if (response.status === 200) {
        message.success("Successful!");
        fetchDetailClass();
      }
    } catch (error) {}
  };
  // Tạo dataSource dựa trên documents và videos từ classSelected
  const dataSource = useMemo(() => {
    if (!classSelected) return [];
    // Lấy mảng documents và videos (nếu không có thì gán là mảng rỗng)
    const docs = classSelected.documents || [];
    const vids = classSelected.videos || [];
    // Lấy độ dài lớn nhất
    const maxLength = Math.max(docs.length, vids.length);
    // Tạo dataSource theo chỉ số
    return Array.from({ length: maxLength }, (_, i) => ({
      key: i,
      session: docs[i]?.name || vids[i]?.name || `Buổi ${i + 1}`, // Ưu tiên name từ documents, nếu không có thì lấy từ videos, nếu vẫn không có thì giữ nguyên "Buổi X"
      pdf: docs[i]?.url || "",
      video: vids[i]?.url || "",
    }));
  }, [classSelected]);

  // Định nghĩa các cột cho bảng
  const columns = [
    { title: "Lesson", dataIndex: "session", key: "session" },
    {
      title: "PDF Document",
      dataIndex: "pdf",
      key: "pdf",
      render: (text) =>
        text ? (
          <Space>
            <a href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
            <Button
              type="link"
              icon={<DownloadOutlined />}
              href={text}
              download
            />
          </Space>
        ) : (
          "No PDF"
        ),
      width: 350,
    },
    {
      title: "Video lecture",
      dataIndex: "video",
      key: "video",
      render: (text) =>
        text ? (
          <Space>
            <a href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
            <Button
              type="link"
              icon={<DownloadOutlined />}
              href={text}
              download
            />
          </Space>
        ) : (
          "No Video"
        ),
      width: 350,
    },
  ];

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
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item href="/tutor/list-classes">Class</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            {className}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="top-body">
          <Card
            title={
              <>
                <h2 className="text-xl font-semibold text-[#1890ff] ">
                  Class information
                </h2>
              </>
            }
            className="mb-5 shadow-md"
          >
            {classSelected && (
              <div className="grid grid-cols-2 gap-y-3 gap-x-5 text-base">
                <p>
                  <strong className="text-gray-600">Student:</strong>{" "}
                  {classSelected.studentId?.username || "No student"}
                </p>
                <p>
                  <strong className="text-gray-600">Tutor:</strong>{" "}
                  {classSelected.tutorId?.username || "Don't have tutor yet"}
                </p>
                <p>
                  <strong className="text-gray-600">Class name:</strong>{" "}
                  {classSelected.name}
                </p>

                <p>
                  <strong className="text-gray-600">Course name:</strong>{" "}
                  {classSelected.courseId?.name}
                </p>
                <p>
                  <strong className="text-gray-600">Start date:</strong>{" "}
                  {classSelected.startdate
                    ? classSelected.startdate.slice(0, 10)
                    : "No start date"}
                </p>
                <p>
                  <strong className="text-gray-600">End date:</strong>{" "}
                  {classSelected.finishdate
                    ? classSelected.finishdate.slice(0, 10)
                    : "Not finish"}
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="bottom-body">
          <div className="flex justify-end">
            <Button type="primary" className="mb-3" onClick={showModal}>
              Upload File
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{
              x: "max-content",
              y: 55 * 5,
            }}
          />
        </div>
      </Content>

      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          initialValues={{ session: "", pdf: null, video: null }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const reponse = await classApi.postFile(id, values);
            if (reponse.status === 200) {
              message.success("Upload success");
              fetchDetailClass();
            }
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
                    <ErrorMessage
                      name="session"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </Form.Item>

                <Form.Item label="PDF Document">
                  <div className="flex items-center">
                    <Upload
                      beforeUpload={(file) =>
                        beforeUploadPDF(file, setFieldValue, setPdfName)
                      }
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Select PDF file</Button>
                    </Upload>
                    {pdfName && (
                      <div className="ml-2 flex items-center">
                        <span>{pdfName}</span>
                        <Button
                          type="link"
                          icon={<CloseCircleOutlined />}
                          onClick={() => {
                            setFieldValue("pdf", null);
                            setPdfName(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-2 error">
                    <ErrorMessage
                      name="pdf"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </Form.Item>

                <Form.Item label="Video lecture">
                  <div className="flex items-center">
                    <Upload
                      beforeUpload={(file) =>
                        beforeUploadVideo(file, setFieldValue, setVideoName)
                      }
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>
                        Select Video file
                      </Button>
                    </Upload>
                    {videoName && (
                      <div className="ml-2 flex items-center">
                        <span>{videoName}</span>
                        <Button
                          type="link"
                          icon={<CloseCircleOutlined />}
                          onClick={() => {
                            setFieldValue("video", null);
                            setVideoName(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-2 error">
                    <ErrorMessage
                      name="video"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    block
                  >
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

export default InfoClassOfUser;
