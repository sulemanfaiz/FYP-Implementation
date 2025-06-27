const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken"); // Add this for token verification

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update this to match your frontend port
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const AuthRouter = require("./routes/authroute");
const ListingRouter = require("./routes/listingroute");
const LikedListingRouter = require("./routes/likedlistingroute");

require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 8080;

// In-memory storage for messages (Replace with database in production)
const chatMessages = {}; // { propertyId: [messages] }
const activeUsers = {}; // { socketId: { userId, propertyId, socketId } }

app.get("/", (req, res) => {
  res.send("Backend is running for KirayePe.com");
});

// Socket.io middleware for authentication
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    // Verify JWT token (adjust secret key as per your implementation)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // For now, we'll skip JWT verification and trust the client

    socket.userId = socket.handshake.auth.userId;
    socket.propertyId = socket.handshake.auth.propertyId;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`User ${socket.userId} connected with socket ID: ${socket.id}`);

  // Handle joining a chat room
  socket.on("joinRoom", ({ propertyId, userId, userName }) => {
    const roomName = `property_${propertyId}`;
    socket.join(roomName);

    // Store user info
    activeUsers[socket.id] = {
      userId,
      userName,
      propertyId,
      socketId: socket.id,
    };

    console.log(`User ${userName} (${userId}) joined room: ${roomName}`);

    // Send previous messages for this property
    const previousMessages = chatMessages[propertyId] || [];
    socket.emit("previousMessages", previousMessages);

    // Notify others in the room that user joined
    socket.to(roomName).emit("userJoined", {
      userId,
      userName,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle sending messages
  socket.on("sendMessage", (messageData) => {
    const { propertyId, senderId, senderName, message, timestamp } =
      messageData;
    const roomName = `property_${propertyId}`;

    // Create message object
    const newMessage = {
      id: Date.now() + Math.random(), // Simple ID generation
      propertyId,
      senderId,
      senderName,
      message,
      timestamp: timestamp || new Date().toISOString(),
    };

    // Store message (in production, save to database)
    if (!chatMessages[propertyId]) {
      chatMessages[propertyId] = [];
    }
    chatMessages[propertyId].push(newMessage);

    // Emit message to all users in the room
    io.to(roomName).emit("newMessage", newMessage);

    console.log(`Message sent in room ${roomName}:`, message);
  });

  // Handle typing indicators
  socket.on("typing", ({ propertyId, userId, isTyping }) => {
    const roomName = `property_${propertyId}`;
    socket.to(roomName).emit("userTyping", { userId, isTyping });
  });

  // Handle user leaving a room
  socket.on("leaveRoom", ({ propertyId, userId }) => {
    const roomName = `property_${propertyId}`;
    socket.leave(roomName);

    socket.to(roomName).emit("userLeft", {
      userId,
      timestamp: new Date().toISOString(),
    });

    console.log(`User ${userId} left room: ${roomName}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const userInfo = activeUsers[socket.id];
    if (userInfo) {
      const roomName = `property_${userInfo.propertyId}`;
      socket.to(roomName).emit("userLeft", {
        userId: userInfo.userId,
        userName: userInfo.userName,
        timestamp: new Date().toISOString(),
      });

      delete activeUsers[socket.id];
      console.log(`User ${userInfo.userName} disconnected`);
    } else {
      console.log("User disconnected");
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// API Routes
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", AuthRouter);
app.use("/listing", ListingRouter);
app.use("/likedlisting", LikedListingRouter);

// API endpoint to get chat messages for a property (optional)
app.get("/api/chat/:propertyId", (req, res) => {
  const { propertyId } = req.params;
  const messages = chatMessages[propertyId] || [];
  res.json({ success: true, messages });
});

// API endpoint to get active users in a property chat (optional)
app.get("/api/chat/:propertyId/users", (req, res) => {
  const { propertyId } = req.params;
  const users = Object.values(activeUsers).filter(
    (user) => user.propertyId === propertyId
  );
  res.json({ success: true, users });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
