import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Popconfirm, Select, Space } from "antd";
import {
  AudioOutlined,
  VideoCameraOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useSocket } from "../../context/SocketContext"; // Import hook từ SocketContext
import Peer from "simple-peer";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../hooks/useUser";
export const CallPage = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const socket = useSocket();
  const userId = useSelector((state) => state.user.id);
  const username = useSelector((state) => state.user.username);
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (myVideo.current) {
            myVideo.current.srcObject = stream;
          }
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );

      if (socket) {
        socket.on("callUser", (data) => {
          setReceivingCall(true);
          setCaller(data.from);
          setName(data.name);
          setCallerSignal(data.signal);
        });
      }
    } catch (error) {
      console.log(error);
    }

    setMe(userId);
  }, [userId, socket, userVideo]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userRole) {
          const response =
            userRole === "Tutor"
              ? await userApi.getAllStudent()
              : await userApi.getAllTutor();

          setUsers(response.data.students || response.data.tutors || []);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser();
  }, [userRole]);

  const handleSelectChange = (value) => {
    setSelectedUserId(value);
  };

  const callUser = (id) => {
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
          userToCall: id,
          signal: data,
          from: me,
          name: username,
        });
      });

      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      });

      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (error) {
      console.error("❌ Lỗi khi gọi user:", error);
    }
  };

  const answerCall = () => {
    try {
      setCallAccepted(true);

      // Tạo đối tượng peer
      const peer = new Peer({
        initiator: false, // Đối phương là người khởi tạo cuộc gọi
        trickle: false, // Tắt trickle
        stream: stream, // Stream của mình (local stream)
      });

      peer.on("signal", (data) => {
        socket.emit("answerCall", {
          signal: data,
          to: caller,
        });
      });
      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream; // Gán stream vào thẻ video
      });

      // Gửi tín hiệu trả lời cuộc gọi
      peer.signal(callerSignal);

      // Lưu đối tượng peer vào reference để có thể thao tác sau này
      connectionRef.current = peer;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (selectedUserId) {
      setName(username);
      console.log(username);

      callUser(selectedUserId);
    } else {
      alert("Vui lòng chọn một user!");
    }
  };
  const leaveCall = () => {
    if (userRole === "Tutor") {
      navigate("/tutor/tutorChat");
    } else {
      navigate("/user/chat");
    }
  };
  // Hàm tắt camera
  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  // Hàm toggle audio
  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioOn((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Call Page</h1>
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-4">
        <div className="relative">
          {/* Remote Video - hiển thị cuộc gọi từ đối phương */}
          <video
            ref={userVideo}
            autoPlay
            playsInline
            muted
            className=" w-full bg-black rounded-lg border-2 border-white"
          />

          {/* Local Video Preview - hiển thị preview của chính bạn */}
          <video
            ref={myVideo}
            autoPlay
            muted
            playsInline
            className="absolute bottom-4 right-4 w-32 h-24 bg-black rounded-lg border-2 border-white"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Space size="middle">
            <Button
              shape="circle"
              icon={<AudioOutlined />}
              onClick={toggleAudio}
              type={isAudioOn ? "primary" : "default"}
            />
            <Button
              shape="circle"
              icon={<VideoCameraOutlined />}
              onClick={toggleCamera}
              type={isCameraOn ? "primary" : "default"}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn thoát cuộc gọi?"
              onConfirm={leaveCall}
              okText="Có"
              cancelText="Không"
            >
              <Button shape="circle" danger icon={<StopOutlined />} />
            </Popconfirm>
          </Space>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {!receivingCall && !callAccepted ? (
            <>
              {" "}
              <Select
                className="w-200"
                placeholder="Chọn người dùng"
                onChange={handleSelectChange}
                value={selectedUserId}
                loading={!users.length} // Hiển thị loading khi dữ liệu chưa có
              >
                {users.map((user) => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.username}
                  </Select.Option>
                ))}
              </Select>
              <Button type="primary" onClick={handleSubmit}>
                Gọi
              </Button>
            </>
          ) : null}
          <div>
            {receivingCall && !callAccepted ? (
              <div>
                <h1>{name} is calling...</h1>
                <Button onClick={answerCall}>Answer</Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
