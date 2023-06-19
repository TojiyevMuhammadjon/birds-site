require("dotenv/config");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(process.cwd() + "/src/birds"));
app.use(express.static(process.cwd() + "/src/template"));
app.use(express.static(process.cwd() + "/uploads"));

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = 0;

io.on("connection", (socket) => {
  users++;
  console.log(socket.id);

  socket.on("message", (message) => {
    // console.log(message);
    io.emit("message-auth", {
      message: "Your message has been sent to the server!",
    });
  });
  io.emit("users", { message: users });

  socket.on("contact", (all)=>{
    console.log(all);
    io.emit("backend-contact", {message:all.message, user: socket.id});
  })
  //   socket.emit("message-auth", {message: ""})

  // Handle Socket.IO events here

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
    users--;
    io.emit("users", { message: users });
  });
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
