import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatHome from "./pages/ChatHome";

import { useEffect } from "react";
import io from "socket.io-client";
import Home from "./pages/Home";


function App() {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      withCredentials: true
    });

    newSocket.on("connect", () => {
      console.log("Connected to PorChatal:", newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection failed:", error.message);
    });

    newSocket.on("message:new", (message) => {
      setMessages((previous) => [...previous, message]);
    })
    return () => {
      newSocket.disconnect();
    }
  }, [])

  const handleSendMessage = (message) => {
    return new Promise((resolve, reject) => {
      if (!socket?.connected) {
        reject(new Error("not connected to porchatal"));
        return;
      }
      socket.emit(
        "message:send",
        {
          recipientId: message.conversationId,
          text: message.text,
        },
        (response) => {
          if (!response?.success) {
            reject(new Error(response?.message || "failed to send message"));
            return;
          }
          setMessages((previous) => [
            ...previous,
            response.message])

          resolve(response.message);
        }
      )
    })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home/chat"
          element={
            <ChatHome
              messages={messages}
              onSendMessage={handleSendMessage}
              socket={socket}
            />} />
      </Routes>
    </>
  )
}

export default App
