require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const chatRegisterRouter = require("./routes/chatRegisterRouter");
const chatLoginRouter = require("./routes/chatLoginRouter");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/register", chatRegisterRouter);
app.use("/login", chatLoginRouter);

app.listen(5000, () => {
    console.log("server is running");
    console.log("http://localhost:5000");

})