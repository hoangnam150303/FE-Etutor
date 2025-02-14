import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Card, Button, List, Radio, Progress, Input, Modal } from 'antd';
import { GlobalOutlined, GithubOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

const UserProfile = () => {


    // Khởi tạo useNavigate
    const navigate = useNavigate();

    // Hàm chuyển hướng
    const goToListClass = () => {
        navigate('/tutor/list-classes');
    };

    const [userData, setUserData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        status: 'Active',
        phone: '123-456-7890',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });
    const handleSave = () => {
        console.log("Saving data:", userData);
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4 lg:p-8">
            <Breadcrumb className="mb-6">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item className="text-[#f5ad95] font-bold">User</Breadcrumb.Item>
                <Breadcrumb.Item className="text-[#f18966] font-bold">Profile 🙌</Breadcrumb.Item>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3 w-full">
                    <Card bordered={false} className="shadow-lg text-center p-6">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-full w-32 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold">{userData.fullName}</h4>
                        <p className="text-gray-600">Full Stack Developer</p>
                        <p className="text-gray-400 text-sm">Bay Area, San Francisco, CA</p>
                        <div className="mt-4 flex justify-center gap-3">
                            <Button type="primary" onClick={goToListClass}>List Class</Button>
                            <Button type="default">Message</Button>
                        </div>
                    </Card>

                    <Card className="h-1/2 mt-4 shadow-md p-4">
                        <List
                            bordered
                            className='h-72 flex flex-col justify-center'
                            dataSource={[
                                { icon: <GlobalOutlined />, label: "Website", value: "https://bootdey.com" },
                                { icon: <GithubOutlined />, label: "Github", value: "bootdey" },
                                { icon: <InstagramOutlined />, label: "Instagram", value: "bootdey" },
                                { icon: <FacebookOutlined />, label: "Facebook", value: "bootdey" }
                            ]}
                            renderItem={item => (
                                <List.Item className="flex items-center justify-between text-center">
                                    <div className="flex items-center space-x-2">
                                        {item.icon}
                                        <span className="font-semibold">{item.label}</span>
                                    </div>
                                    <span className="text-gray-600">{item.value}</span>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>

                <div className="lg:w-2/3 w-full">
                    <Card className="shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[210px]">
                            <div className="space-y-4">
                                <p className="font-semibold border-b pb-2">Full Name</p>
                                <p className="font-semibold border-b pb-2">Email</p>
                                <p className="font-semibold border-b pb-2">Status</p>
                                <p className="font-semibold border-b pb-2">Phone</p>
                            </div>
                            <div className="space-y-4 text-gray-600">
                                <p className="border-b pb-2">{userData.fullName}</p>
                                <p className="border-b pb-2">{userData.email}</p>
                                <div className="border-b pb-2">
                                    <Radio.Group value={userData.status} onChange={(e) => setUserData({ ...userData, status: e.target.value })}>
                                        <Radio value="Active">Active</Radio>
                                        <Radio value="Inactive">Inactive</Radio>
                                    </Radio.Group>
                                </div>
                                <p className="border-b pb-2">{userData.phone}</p>
                            </div>
                        </div>
                        <Button type="primary" className="mt-4" onClick={showModal}>Edit</Button>
                    </Card>

                    <Card className="shadow-md p-6 mt-4 h-1/2">
                        <h6 className="text-lg font-semibold mb-3">Project Status</h6>
                        {['Web Design', 'Website Markup', 'One Page', 'Mobile Template'].map((project, idx) => (
                            <div key={idx} className="mb-4">
                                <p className="font-medium">{project}</p>
                                <Progress percent={80} status="active" />
                            </div>
                        ))}
                    </Card>
                </div>
            </div>

            <Modal title="Edit Profile" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium">Full Name</label>
                        <Input name="fullName" value={userData.fullName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium">Email</label>
                        <Input name="email" value={userData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium">Phone</label>
                        <Input name="phone" value={userData.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block font-medium">Status</label>
                        <Radio.Group value={userData.status} onChange={(e) => setUserData({ ...userData, status: e.target.value })}>
                            <Radio value="Active">Active</Radio>
                            <Radio value="Inactive">Inactive</Radio>
                        </Radio.Group>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserProfile;
