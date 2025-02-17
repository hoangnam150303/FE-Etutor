import { Breadcrumb, Button, Dropdown, Input, Menu, Avatar } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  MenuOutlined,
  PhoneOutlined,
  SendOutlined,
  HeartOutlined,
  BellOutlined,
  SearchOutlined,
  AudioOutlined,
  CameraOutlined,
  PaperClipOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";

const TutorChat = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const emojiList = ["😀", "😂", "😍", "😎", "😢", "😡", "👍", "🎉"];
  const chatList = [
    { id: 1, name: "Messi", messages: ["Hi", "How are you?"] },
    { id: 2, name: "Kina Mayer", messages: ["Hey!", "How's it going?"] },
    { id: 3, name: "John Dry", messages: ["Hi", "How are you?"] },
    { id: 4, name: "Louis Mayer", messages: ["Hey!", "How's it going?"] },
    { id: 5, name: "Obama", messages: ["Hi", "How are you?"] },
    { id: 6, name: "Ronaldo", messages: ["Hey!", "How's it going?"] },
    { id: 7, name: "Muoi` gio'", messages: ["Hi", "How are you?"] },
    { id: 8, name: "Bay? cho.", messages: ["Hey!", "How's it going?"] },
  ];
  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emojiMenu = (
    <Menu>
      {emojiList.map((emoji, index) => (
        <Menu.Item key={index} onClick={() => setMessage(message + emoji)}>
          {emoji}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const truncateFileName = (name, limit = 10) => {
    if (name.length > limit) {
      const extension = name.split(".").pop();
      const baseName = name.substring(0, limit);
      return `${baseName}...${extension}`;
    }
    return name;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
        <Breadcrumb.Item>Tutor</Breadcrumb.Item>
        <Breadcrumb.Item className="text-[#f18966] font-bold">
          Chat 👋🏻
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-1 h-full rounded-md relative">
        {/* Sidebar - Hidden on Small Screens */}

        <div
          className={`fixed inset-y-0 left-0 z-50 bg-white w-3/4 max-w-xs p-4 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative lg:w-1/5 border-r border-gray-200`}
        >
          <button
            className="lg:hidden absolute top-4 right-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✖
          </button>
          <div className="text-lg font-bold">Chat</div>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="my-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-4">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded ${
                  selectedChat?.id === chat.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedChat(chat);
                  setIsSidebarOpen(false);
                }}
              >
                <Avatar src="https://placehold.co/40x40" />
                <div>
                  <div className="font-semibold">{chat.name}</div>
                  <div className="text-sm text-gray-500">
                    {chat.messages[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Section */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex justify-between p-4 border-b border-gray-300">
                <div className="flex items-center">
                  <button
                    className="lg:hidden mr-3"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <MenuOutlined />
                  </button>
                  <Avatar src="https://placehold.co/40x40" />
                  <div className="ml-3">
                    <div className="font-bold">{selectedChat.name}</div>
                    <div className="text-sm text-green-500">● Online</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <PhoneOutlined />
                  <SearchOutlined />
                  <HeartOutlined />
                  <BellOutlined />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {selectedChat.messages.map((msg, index) => (
                  <div key={index} className="flex mb-4">
                    <Avatar src="https://placehold.co/40x40" />
                    <div className="ml-3 p-3 bg-gray-200 rounded-lg max-w-xs">
                      {msg}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-300 flex items-center">
                <AudioOutlined className="mr-3 text-gray-500" />
                <Input
                  placeholder="Write something..."
                  className="flex-1 mr-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <PaperClipOutlined
                  className="mr-3 text-gray-500"
                  onClick={handleFileClick}
                />
                {file && (
                  <span className="text-gray-600 text-sm mr-3">
                    {truncateFileName(file.name, 10)}
                  </span>
                )}
                <CameraOutlined className="mr-3 text-gray-500" />
                <Dropdown overlay={emojiMenu} trigger={["click"]}>
                  <SmileOutlined className="mr-3 text-gray-500 cursor-pointer" />
                </Dropdown>
                <Button type="primary" shape="circle" icon={<SendOutlined />} />
              </div>
            </>
          ) : (
            <div className="flex flex-1 justify-center items-center text-gray-500">
              <button
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MenuOutlined /> Chọn một cuộc trò chuyện
              </button>
              <span className="hidden lg:block">
                Chọn một cuộc trò chuyện để bắt đầu
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorChat;
