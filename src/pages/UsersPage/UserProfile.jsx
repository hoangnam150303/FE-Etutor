import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Button,
  List,
  Radio,
  Input,
  Modal,
  message,
  Upload,
} from "antd";
import { useSelector } from "react-redux";
import { getUserRequest } from "../../reducers/user";
import userApi from "../../hooks/useUser";
import { UploadOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const userId = useSelector((state) => state.user.id);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    avatar: "",
  });
  // Khởi tạo useNavigate
  const fetchUser = async () => {
    try {
      const response = await userApi.getUserById(userId);
      setUser(response.data.user);
    } catch (error) {}
  };
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);
  const navigate = useNavigate();
  const showPasswordFields = async () => {
    try {
      setUpdatePassword(true);
    } catch (error) {}
  };
  useEffect(() => {
    if ((isModalOpen && user) || (isModalAvatarOpen && user)) {
      setUserData({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        avatar: user.avatar,
      });
    }
  }, [isModalOpen, user]);

  const showModal = () => setIsModalOpen(true);
  const showModalAvatar = () => setIsModalAvatarOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleSave = async () => {
    try {
      const response = await userApi.updateProfile(userData);
      if (response.status === 200) {
        message.success("Update successfully");
        setIsModalOpen(false);
        setIsModalAvatarOpen(false);
        fetchUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container h-full lg:h-screen xl:h-screen mx-auto p-4 lg:p-8">
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item className="text-[#f5ad95] font-bold">
          User
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-[#f18966] font-bold">
          Profile 🙌
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="lg:w-1/3 w-full">
          <Card
            bordered={false}
            className="shadow-lg text-center p-6 h-4/5 md:h-4/5 xl:h-1/2 mt-20"
          >
            <img
              src={
                user.avatar ||
                "https://res.cloudinary.com/dnv7bjvth/image/upload/v1743668834/AvatarDefault_f1sh7i.png"
              }
              alt="Avatar"
              className="rounded-full w-32 mx-auto mb-4"
            />
            <h4 className="text-lg font-semibold">{user.username}</h4>

            <div className="mt-4 flex justify-center gap-3">
              <Link to="/user/chat">
                <Button type="default">Message</Button>
              </Link>

              <Button type="primary" onClick={showModalAvatar}>
                Update Avatar
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:w-2/3 w-full h-full">
          <Card className="shadow-md p-6 h-4/5 md:h-4/5 xl:h-1/2 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[210px]">
              <div className="space-y-4">
                <p className="font-semibold border-b pb-2">Full Name</p>
                <p className="font-semibold border-b pb-2">Email</p>
                <p className="font-semibold border-b pb-2">Phone</p>
                <p className="font-semibold border-b pb-2">Role</p>
              </div>
              <div className="space-y-4 text-gray-600">
                <p className="border-b pb-2">{user.username}</p>
                <p className="border-b pb-2">{user.email}</p>
                <p className="border-b pb-2">{user.phoneNumber || "N/A"}</p>
                <p className="border-b pb-2">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button type="primary" className="" onClick={showModal}>
                Edit
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* popup edit */}

      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <Input
              name="username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <Input
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <Input
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
          {updatePassword && (
            <>
              <div>
                <label className="block font-medium">Old Password</label>
                <Input
                  name="oldPassword"
                  value={userData.oldPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block font-medium">New Password</label>
                <Input
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block font-medium">Confirm new pasword</label>
                <Input
                  name="confirmNewPassword"
                  value={userData.confirmNewPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button type="primary" onClick={showPasswordFields}>
              password
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit Avatar"
        open={isModalAvatarOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              // Lưu đối tượng file vào state thay vì chuyển đổi sang base64
              setUserData({ ...userData, avatar: file });
              return false; // Ngăn upload tự động
            }}
          >
            {userData.avatar ? (
              <img
                src={
                  // Nếu avatar là đối tượng file, tạo URL tạm thời để hiển thị preview
                  typeof userData.avatar === "object"
                    ? URL.createObjectURL(userData.avatar)
                    : userData.avatar
                }
                alt="avatar"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <div>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </div>
            )}
          </Upload>

          {userData.avatar && (
            <Button
              type="default"
              danger
              onClick={() => setUserData({ ...userData, avatar: "" })}
              style={{ marginTop: 16 }}
            >
              Remove Image
            </Button>
          )}

          <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
