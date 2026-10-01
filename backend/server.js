const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("hello porChatal");
})

app.listen(5000,()=>{
    console.log("server is running");
    console.log("http://localhost:5000");
    
})