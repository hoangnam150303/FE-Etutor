import { Breadcrumb, Card, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";

const ListClass = () => {
    const navigate = useNavigate();

    const data = [
        { id: 1, className: "Class A", studentName: "John Doe", courseName: "Mathematics" },
        { id: 2, className: "Class B", studentName: "Jane Smith", courseName: "Physics" },
        { id: 3, className: "Class A", studentName: "Mike Johnson", courseName: "Chemistry" },
        { id: 4, className: "Class C", studentName: "Emily Davis", courseName: "Biology" },
        { id: 5, className: "Class B", studentName: "Chris Brown", courseName: "History" }
    ];

    return (
        <div>
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base '>
                    <Breadcrumb.Item>Tutor</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>Classes 👋🏻</Breadcrumb.Item>
                </Breadcrumb>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            title={<span className="text-lg font-semibold">{item.className}</span>}
                            bordered={true}
                            className="shadow-lg rounded-lg"
                            actions={[
                                <Button
                                    type="primary"
                                    onClick={() => navigate(`/tutor/list-classes/${item.className}`)}
                                >
                                    View
                                </Button>
                            ]}
                        >
                            <p className="text-gray-700"><strong>Student:</strong> {item.studentName}</p>
                            <p className="text-gray-700"><strong>Course:</strong> {item.courseName}</p>
                        </Card>
                    ))}
                </div>
            </Content>
        </div>
    );
};

export default ListClass;
