require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const chatRegisterRouter = require("./routes/chatRegisterRouter");
const chatLoginRouter = require("./routes/chatLoginRouter");
const chatHomeAuthRouter = require("./routes/chatHomeAuthRouter");
const logOutRouter = require("./routes/chatLogOutRouter");

const connectionRouter = require("./routes/connectionRoutes");

const authSocket = require("./middlewares/socketAuthMiddleware");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})
io.use(authSocket);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/register", chatRegisterRouter);
app.use("/login", chatLoginRouter);
app.use("/home", chatHomeAuthRouter);
app.use("/logout", logOutRouter);

app.use("/connections", connectionRouter);

io.on("connection", (socket) => {
    console.log("socket connected : ", socket.id);

    socket.on("connection:join", async (data, callback) => {
        try {
            const currentUserId = socket.userId;
            const otherUserId = data?.otherUserId;

            if (!otherUserId || currentUserId === otherUserId) {
                return callback?.({
                    success: false,
                    message: "Invalid conversation"
                })
            }

            const [userA, userB] =
                currentUserId < otherUserId
                    ? [currentUserId, otherUserId]
                    : [otherUserId, currentUserId];

            const result = await pool.query(`
                SELECT 1
                FROM connections
                WHERE user_a = $1 AND user_b = $2`, [userA, userB]);

            if (result.rowCount === 0) {
                return callback?.({
                    success: false,
                    message: "you are not connected to this user"
                })
            }
            const room = `connection:${userA}:${userB}`;
            await socket.join(room);
        } catch (error) {
            console.error("join conversation error", error);

            return callback?.({
                success: false,
                message: "Could not open conversation"
            })
        }
    })

    // send an message
    socket.on("message:send", async (data, callback) => {
        try {
            const senderId = socket.userId;
            const recipientId = data?.recipientId;

            const messageText = typeof data?.text === String ? data?.text.trim() : "";

            if (!recipientId || recipientId === senderId
                || !messageText || messageText.length > 5000) {
                return callback?.({
                    success: false,
                    message: "Invalid message"
                })
            }

            const [userA, userB] =
                senderId < recipientId
                    ? [senderId, recipientId]
                    : [recipientId, senderId];

            const result = await pool.query(`
                SELECT 1
                FROM connections
                WHERE user_a = $1 AND user_b = $2`, [userA, userB]);

            if (result.rowCount === 0) {
                return callback?.({
                    success: false,
                    message: "You are not connected to this user"
                })
            }

            const room = `connections:${userA}:${userB}`;
            if (!socket.rooms.has(room)) {
                return callback?.({
                    success: false,
                    message: "Join the conversation before sending"
                })
            }

            const message = {
                id: require("crypto").randomUUID(),
                senderId,
                text: message,
                createdAt: new Date().toISOString(),
            };

            // deliver to the other reciver, not back to sender
            socket.to(room).emit(("message:new"), {
                ...message,
                conversationId: senderId,
            })

            return callback?.({
                success: true,
                message: {
                    ...message,
                    conversationId: senderId
                }
            })

        } catch (error) {
            console.log("message sending error", error);

            return callback?.({
                success: false,
                message: "failed to send message"
            })
        }
    })
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.userId);
    });
})

server.listen(5000, () => {
    console.log("server is running");
    console.log("http://localhost:5000");

})