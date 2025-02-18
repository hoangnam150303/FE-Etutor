// SocketContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../reducers/user";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
    if (userId && !socket) {
      const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
        query: { userId },
      });
      setSocket(newSocket);
    }
    // Nếu muốn đóng socket khi unmount, bạn có thể thêm cleanup
    return () => {
      if (socket) socket.disconnect();
    };
  }, [userId, socket, dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
