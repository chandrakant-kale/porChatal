require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cookieParser = require("cookie-parser");
const http = require("http");
const crypto = require("crypto");
const { Server } = require("socket.io");
const helmet = require("helmet");

// Routes
const chatRegisterRouter = require("./routes/chatRegisterRouter");
const chatLoginRouter = require("./routes/chatLoginRouter");
const chatHomeAuthRouter = require("./routes/chatHomeAuthRouter");
const logOutRouter = require("./routes/chatLogOutRouter");
const deleteAccountRouter = require("./routes/deleteAccountRouter");
const connectionRouter = require("./routes/connectionRoutes");

// Middlewares
const authSocket = require("./middlewares/socketAuthMiddleware");
const loginLimiter = require("./middlewares/loginLimiter");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Validate required production configuration
if (process.env.NODE_ENV === "production") {
  if (!process.env.CLIENT_URL || !process.env.JWT_SECRET) {
    throw new Error("CLIENT_URL and JWT_SECRET must be configured");
  }
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

// CORS configuration
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

// Express security middleware
app.use(helmet());

app.use(cors(corsOptions));

app.use(express.json({
  limit: "10kb",
}));

app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "PorChatal backend is running",
  });
});

// Routes
app.use("/register", chatRegisterRouter);

app.use("/login", loginLimiter);
app.use("/login", chatLoginRouter);

app.use("/home", chatHomeAuthRouter);
app.use("/logout", logOutRouter);

app.use("/connections", connectionRouter);
app.use("/delete", deleteAccountRouter);

// Socket.IO configuration
const io = new Server(server, {
  cors: corsOptions,
  maxHttpBufferSize: 10 * 1024,
  perMessageDeflate: false,
});

// Authenticate every new socket connection
io.use(authSocket);

// Message rate limiting
const messageRequests = new Map();

const MESSAGE_LIMIT = 30;
const MESSAGE_WINDOW = 60 * 1000;

const checkMessageLimit = (userId) => {
  const now = Date.now();
  const previousRequests = messageRequests.get(userId) || [];

  const recentRequests = previousRequests.filter(
    (timestamp) => now - timestamp < MESSAGE_WINDOW
  );

  if (recentRequests.length >= MESSAGE_LIMIT) {
    messageRequests.set(userId, recentRequests);
    return false;
  }

  recentRequests.push(now);
  messageRequests.set(userId, recentRequests);

  return true;
};

// Conversation room name
const getConversationRoom = (userA, userB) => {
  const [firstUser, secondUser] =
    userA < userB ? [userA, userB] : [userB, userA];

  return `connection:${firstUser}:${secondUser}`;
};

// Verify that two users are connected
const areUsersConnected = async (userA, userB) => {
  const [firstUser, secondUser] =
    userA < userB
      ? [userA, userB]
      : [userB, userA];

  const result = await pool.query(
    `SELECT 1
     FROM connections
     WHERE user_a = $1 AND user_b = $2`,
    [firstUser, secondUser]
  );

  return result.rowCount > 0;
};

// Socket connection
io.on("connection", (socket) => {
  const userId = socket.userId;

  console.log("Authenticated socket connected:", socket.id);

  // Join a conversation
  socket.on("conversation:join", async (data, callback) => {
    if (typeof callback !== "function") {
      return;
    }

    try {
      const otherUserId = data?.otherUserId;

      if (
        typeof otherUserId !== "string" ||
        !otherUserId ||
        otherUserId === userId
      ) {
        return callback({
          success: false,
          message: "Invalid conversation",
        });
      }

      const room = getConversationRoom(userId, otherUserId);

      const connected = await areUsersConnected(userId, otherUserId);

      if (!connected) {
        return callback({
          success: false,
          message: "You are not connected to this user",
        });
      }

      await socket.join(room);

      return callback({
        success: true,
        message: "Conversation joined",
      });

    } catch (error) {
      console.error("Join conversation error:", error.message);

      return callback({
        success: false,
        message: "Could not open conversation",
      });
    }
  });

  // Send ephemeral messages
  socket.on("message:send", async (data, callback) => {
    if (typeof callback !== "function") {
      return;
    }

    try {
      const recipientId = data?.recipientId;

      const messageText =
        typeof data?.text === "string"
          ? data.text.trim()
          : "";

      if (
        typeof recipientId !== "string" ||
        !recipientId ||
        recipientId === userId ||
        !messageText ||
        messageText.length > 5000
      ) {
        return callback({
          success: false,
          message: "Invalid message",
        });
      }

      const room = getConversationRoom(userId, recipientId);

      // Sender must join the conversation first
      if (!socket.rooms.has(room)) {
        return callback({
          success: false,
          message: "Join the conversation before sending",
        });
      }

      // Check that users are still connected
      const connected = await areUsersConnected(userId, recipientId);

      if (!connected) {
        await socket.leave(room);

        return callback({
          success: false,
          message: "You are not connected to this user",
        });
      }

      // Rate limit messages per authenticated user
      if (!checkMessageLimit(userId)) {
        return callback({
          success: false,
          message: "Too many messages. Please slow down.",
        });
      }

      const message = {
        id: crypto.randomUUID(),
        senderId: userId,
        text: messageText,
        createdAt: new Date().toISOString(),
      };

      // Send to the other participant
      socket.to(room).emit("message:new", {
        ...message,
        conversationId: userId,
      });

      // Acknowledge the sender
      return callback({
        success: true,
        message: {
          ...message,
          conversationId: recipientId,
        },
      });

    } catch (error) {
      console.error("Message sending error:", error.message);

      return callback({
        success: false,
        message: "Failed to send message",
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);

    // Remove rate-limit state only when the user has no other sockets
    const remainingSockets = [...io.sockets.sockets.values()].some(
      (connectedSocket) => connectedSocket.userId === userId
    );

    if (!remainingSockets) {
      messageRequests.delete(userId);
    }
  });
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`PorChatal server running on port ${PORT}`);
});