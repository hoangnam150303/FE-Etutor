import { Breadcrumb, Card, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classApi from "../../hooks/classApi";

const ListClass = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const fetchClasses = async () => {
    try {
      const response = await classApi.getClassByTutor();
      if (response.data.success) {
        setClasses(response.data.classValid);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base ">
          <Breadcrumb.Item>Tutor</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Classes 👋🏻
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4">
          {classes.map((item) => (
            <Card
              key={item._id}
              title={<span className="text-lg font-semibold">{item.name}</span>}
              bordered={true}
              className="shadow-lg rounded-lg"
              actions={[
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(`/tutor/list-classes/${item._id}`)
                  }
                >
                  View
                </Button>,
              ]}
            >
              <p className="text-gray-700">
                <strong>Student:</strong> {item.studentId.username}
              </p>
              <p className="text-gray-700">
                <strong>Course:</strong> {item.courseId.name}
              </p>
            </Card>
          ))}
        </div>
      </Content>
    </div>
  );
};

export default ListClass;
