import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb, Button, Dropdown, Input, Menu, Avatar } from "antd";
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
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext"; // import hook từ SocketContext
import chatApi from "../../hooks/chatApi";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [avtarHost, setAvtarHost] = useState(null);
  const [avatarAnother, setAvatarAnother] = useState(null);
  const [usernameAnother, setUsernameAnother] = useState(null);
  const userId = useSelector((state) => state.user.id);
  // Sử dụng socket từ SocketContext (đã được khởi tạo toàn cục)
  const socket = useSocket();
  const role = useSelector((state) => state.user.role);
  const emojiList = ["😀", "😂", "😍", "😎", "😢", "😡", "👍", "🎉"];
  const emojiMenu = (
    <Menu>
      {emojiList.map((emoji, index) => (
        <Menu.Item key={index} onClick={() => setMessage(message + emoji)}>
          {emoji}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    // Lắng nghe các sự kiện socket
    if (socket) {
      socket.on("new-message", (msg) => {
        setNewMessage(msg);
        // Kiểm tra và cập nhật tin nhắn nếu tin nhắn thuộc cuộc trò chuyện hiện tại
      });
    }

    // Cleanup sự kiện khi component unmount
    return () => {
      if (socket) {
        socket.off("new-message");
        socket.off("new-call");
      }
    };
  }, [socket]);

  // Hàm gửi tin nhắn
  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      // Gửi tin nhắn tới backend qua API
      await chatApi.sendMessage({ message }, receiverId);

      // Cập nhật tin nhắn vào state đúng bên
      const newMsg = {
        senderId: { _id: userId }, // Đảm bảo _id của senderId là userId hiện tại
        receiverId: { _id: receiverId }, // Đảm bảo receiverId chính xác
        message: message,
        timestamp: new Date().toISOString(),
      };

      setSelectedChat((prevChat) => [...(prevChat || []), newMsg]);

      // Gửi tin nhắn qua socket
      if (socket) {
        socket.emit("new-message", newMsg);
      }

      setMessage("");
      setFile(null);
      fetchChatList(); // Cập nhật danh sách chat sau khi gửi tin nhắn
      openConversation(receiverId); // Mở lại cuộc trò chuyện để cập nhật
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Hàm lấy danh sách chat
  const fetchChatList = async () => {
    try {
      const response = await chatApi.getAllChat();
      setChatList(response.data);
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
  };

  useEffect(() => {
    fetchChatList();
    if (receiverId) {
      openConversation(receiverId);
    }
  }, [newMessage]);

  // Hàm mở cuộc trò chuyện khi click vào một chat
  const openConversation = async (id) => {
    try {
      const response = await chatApi.getMessage(id);

      response.data.forEach((message) => {
        if (message.senderId._id === userId) {
          setAvtarHost(message.senderId.avatar);
        } else {
          setAvtarHost(message.receiverId.avatar);
        }
        if (message.receiverId._id === id) {
          setAvatarAnother(message.receiverId.avatar);
          setUsernameAnother(message.receiverId.username);
        } else {
          setAvatarAnother(message.senderId.avatar);
          setUsernameAnother(message.senderId.username);
        }
      });

      setReceiverId(id);
      setSelectedChat(response.data);
    } catch (error) {
      console.error("Error opening conversation:", error);
    }
  };

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
        <Breadcrumb.Item>{role}</Breadcrumb.Item>
        <Breadcrumb.Item className="text-[#f18966] font-bold">
          Chat 👋🏻
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-1 h-full rounded-md relative">
        {/* Sidebar */}
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
          <div className="text-lg font-bold">
            Chat
            <Link to={"/callPage"}>
              <Button className="ml-24 w-12 h-5 " type="primary">
                <PhoneOutlined />
              </Button>
            </Link>
          </div>

          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="my-3"
          />
          <div className="space-y-4">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded ${
                  selectedChat?.id === chat.receiverId
                    ? "bg-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  openConversation(chat.receiverId);
                  setIsSidebarOpen(false);
                }}
              >
                <Avatar src={chat.receiverInfo.avatar} />
                <div>
                  <div className="font-semibold">
                    {chat.receiverInfo.username}
                  </div>
                  <div className="text-sm text-black">{chat.lastMessage}</div>
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
                  <Avatar src={avatarAnother} />
                  <div className="ml-3">
                    <div className="font-bold">{usernameAnother}</div>
                    <div className="text-sm text-green-500">● Online</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <SearchOutlined />
                  <HeartOutlined />
                  <BellOutlined />
                </div>
              </div>
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {selectedChat.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-center mb-4 ${
                      msg.senderId._id === userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {msg.senderId._id !== userId && (
                      <Avatar src={avatarAnother} />
                    )}
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        msg.senderId._id === userId
                          ? "bg-blue-500 text-white ml-2"
                          : "bg-gray-200 mr-2"
                      }`}
                    >
                      {msg.message}
                    </div>
                    {msg.senderId._id === userId && <Avatar src={avtarHost} />}
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
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  onClick={sendMessage}
                />
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

export default Chat;
