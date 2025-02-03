import { Breadcrumb, Button, Popconfirm, Select, Table } from "antd";
import { createStyles } from 'antd-style';
import { Content } from "antd/es/layout/layout";
import React from "react";

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
            <button className="text-blue-500 px-4 py-1 rounded-md border border-blue-500 mb-2">Edit</button>
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

const ClassRegis = () => {

    const { styles } = useStyle();

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

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
                    <Button className="text-green-800 px-4 py-1 rounded-md border border-green-800">Add Class</Button>
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
        </div>
    );
};  

export default ClassRegis;