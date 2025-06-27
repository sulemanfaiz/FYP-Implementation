// src/components/Chat.js
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // Backend URL

const Chat = ({ roomId, currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join room when component mounts
    socket.emit("join_room", roomId);

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        roomId,
        text: message,
        sender: currentUser, // e.g., "landlord" or "renter"
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h3>Chat (Room: {roomId})</h3>
      <div className="messages">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender}:</strong> {msg.text} <em>({msg.timestamp})</em>
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
