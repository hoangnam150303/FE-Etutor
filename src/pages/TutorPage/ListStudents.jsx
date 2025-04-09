import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Breadcrumb, Button, Table } from "antd";
import userApi from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import chatApi from "../../hooks/chatApi";
const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const fetchStudents = async () => {
    try {
      const response = await userApi.getAllStudent();
      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChat = async (id) => {
    try {
      const response = await chatApi.sendMessage({ message: " " }, id);

      if (response.status === 200) {
        navigate("/tutor/tutorChat");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 175,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="">
          <Button
            className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2"
            onClick={() => handleChat(record._id)} // Truyền ID đúng cách
          >
            Chat
          </Button>
        </div>
      ),
    },
  ];
  const dataSource = students.map((student, i) => ({
    key: i,
    _id: student._id,
    name: student.username,
    email: student.email,
  }));

  return (
    <div className="">
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base ">
          <Breadcrumb.Item>Tutor</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            List Students 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="my-2">
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

export default ListStudents;
