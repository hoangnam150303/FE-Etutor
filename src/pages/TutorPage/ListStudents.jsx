import React from "react";
import { Content } from "antd/es/layout/layout";
import { Breadcrumb, Button, Table } from "antd";

const ListStudents = () => {

    const columns = [
        {
            title: 'Full Name',
            width: 150,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 175,
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
            width: 100,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            width: 100,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <div className="">
                <Button className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2">
                    View
                </Button>
            </div>,
        },
    ];
    const dataSource = Array.from({
        length: 100,
    }).map((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        email: `email${i}@gmail.com`,
        class: `Class ${i}`,
        course: `Course ${i}`,
        phone: 329890987,
    }));

    return (
        <div className="">
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base '>
                    <Breadcrumb.Item>Tutor</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>List Students 👋🏻</Breadcrumb.Item>
                </Breadcrumb>
                <div className="my-2">
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

export default ListStudents;