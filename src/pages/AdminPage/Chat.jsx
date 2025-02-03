import { Breadcrumb, Button, Dropdown, Input, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import React from "react";

const Chat = () => {

    // Danh sách emojis
    const emojiList = ['😊', '😂', '😢', '😡', '😍', '👍', '🎉'];

    // Menu chứa các emoji
    const emojiMenu = (
        <Menu>
            {emojiList.map((emoji, index) => (
                <Menu.Item key={index} onClick={() => setInput((prev) => prev + emoji)}>
                    {emoji}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div>
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base '>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>Chat 👋🏻</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex-1 relative">
                    {/* Background Circle */}
                    <div
                        className="absolute inset-0 flex justify-center items-center"
                        style={{
                            zIndex: '-1', // Đưa hình tròn ra phía sau nội dung
                        }}
                    >
                        <div
                            className="w-150 h-150 rounded-full bg-cover opacity-30"
                            style={{
                                backgroundImage: `url('https://res.cloudinary.com/dmyfiyug9/image/upload/v1733819443/lgbf_qyw8ac.png')`,
                                filter: 'blur(1px)', // Làm mờ hình ảnh
                            }}
                        ></div>
                    </div>

                    {/* Chat Header */}
                    <header className="bg-white p-4 h-16 text-gray-700 border-b border-gray-300 text-center">
                        <h1 className="text-2xl font-semibold text-black-2">ABC</h1>
                    </header>

                    {/* Chat Messages */}
                    <div className="h-screen overflow-y-auto p-4 pb-36 lg:text-xl">
                        {/* {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex mb-4 ${message.senderId === id ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {message.senderId !== id && (
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                        <img
                                            src={message.avatar}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                )}

                                <div
                                    className={`max-w-96 rounded-lg p-3 ${message.senderId === id
                                        ? "bg-[#679089] text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                    style={{
                                        wordBreak: 'break-word', // Tự động xuống dòng khi từ quá dài
                                        whiteSpace: 'pre-wrap', // Giữ nguyên định dạng dòng nếu có xuống dòng thủ công
                                    }}
                                >
                                    <p>{message.content}</p>
                                </div>

                                {message.senderId === id && (
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                        <img
                                            src={message.avatar}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                )}
                            </div>
                        ))} */}
                    </div>

                    {/* Chat Input */}
                    <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full h-20">
                        <div className="flex items-center">
                            <Dropdown overlay={emojiMenu} trigger={['click']}>
                                <Button className="mr-2" icon={<SmileOutlined />} />
                            </Dropdown>
                            <Input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full rounded-md h-10"
                            />
                            <Button className="ml-2 bg-[#679089] h-10 w-14" type="primary">
                                <SendOutlined />
                            </Button>
                        </div>
                    </footer>
                </div>
            </Content>
        </div>
    );
};

export default Chat;