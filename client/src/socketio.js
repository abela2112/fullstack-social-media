import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000"; // Replace with your server URL

let socket = null;

export const getSocket = ({userId}) => {
  console.log("Connecting ..socket user id", userId);
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      query: { userId: window.localStorage.getItem("userId") },
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
