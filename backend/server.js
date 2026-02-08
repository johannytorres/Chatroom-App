const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const roomHistory = {};

app.use(express.static(path.join(__dirname, "../frontend")));

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    socket.room = room;
    socket.username = username;

    // enviar historial si existe
    if (roomHistory[room]) {
      socket.emit("chat-history", roomHistory[room]);
    }

    // avisar entrada
    io.to(room).emit("system-message", {
      text: `${username} se unió al chat`
    });
  });

  socket.on("chat-message", (data) => {
    if (!roomHistory[data.room]) {
      roomHistory[data.room] = [];
    }

    roomHistory[data.room].push(data);

    io.to(data.room).emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    if (socket.room && socket.username) {
      io.to(socket.room).emit("system-message", {
        text: `${socket.username} salió del chat`
      });
    }

    console.log("Usuario desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor corriendo");
});
