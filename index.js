const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routers/userrouter");
const blogRouter = require("./routers/blogrouter");
const commentRouter = require("./routers/commentsrouter");
const likeRouter = require("./routers/likerouter");
const savedRouter = require("./routers/saveblogrouter");
const messageRouter = require("./routers/messagerouter");
const PORT = process.env.PORT || 5000
const morgan = require("morgan");
const cors = require("cors");
const socket = require("socket.io");

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//register router
app.use("/user", userRouter);
//blog
app.use("/blog", blogRouter);
//comment
app.use("/comment", commentRouter);
//like
app.use("/like", likeRouter);
//save
app.use("/save", savedRouter);
//messages
app.use("/message", messageRouter);
//home router
app.get("/", (req, res) => {
  res.send("backend running");
});

//server create
const server = app.listen(PORT, () => {
  console.log(`server start on ${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})
global.onlineUsers = new Map()
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  })
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recive", data.msg)
    }
  })
})

//db connected
mongoose.connect("mongodb+srv://prem:S6xj1hE733UzGlZH@cluster0.c1hmm.mongodb.net/blogSpot",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("DB connected successfully");
    }
  }
);
