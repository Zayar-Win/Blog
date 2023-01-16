const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sendMail = require("./config/sendMail");
const connectDb = require("./config/connectDb");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { createServer } = require("http");
const { Server, Socket } = require("socket.io");
const socketServer = require("./config/SocketServer");
require("dotenv").config();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDb();

const httpServer = createServer(app);
var io = new Server(httpServer);

exports.io = io;

io.on("connection", (Socket) => {
  socketServer(Socket);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
