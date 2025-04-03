// SocketContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const userId = useSelector((state) => state.user.id);


  useEffect(() => {
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
  }, [userId, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
