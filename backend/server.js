const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Create the Express app, HTTP server, and Socket.IO layer used by the chat backend.
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Store message history per room so new users can receive the recent conversation.
const roomHistory = {};

// Serve the frontend files directly from the frontend directory.
app.use(express.static(path.join(__dirname, "../frontend")));

// Handle each websocket connection and wire up the room and message events.
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Join the requested room, remember the socket identity, and replay the room history.
  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    socket.room = room;
    socket.username = username;

    // Send the saved chat history to this socket if the room already has messages.
    if (roomHistory[room]) {
      socket.emit("chat-history", roomHistory[room]);
    }

    // Notify everyone in the room that a new user joined.
    io.to(room).emit("system-message", {
      text: `${username} se unió al chat`
    });
  });

  // Persist each chat message in memory and broadcast it to the active room.
  socket.on("chat-message", (data) => {
    if (!roomHistory[data.room]) {
      roomHistory[data.room] = [];
    }

    roomHistory[data.room].push(data);

    io.to(data.room).emit("chat-message", data);
  });

  // Broadcast a leave notice when a connected user disconnects.
  socket.on("disconnect", () => {
    if (socket.room && socket.username) {
      io.to(socket.room).emit("system-message", {
        text: `${socket.username} salió del chat`
      });
    }

    console.log("Usuario desconectado");
  });
});

// Start the server on the configured port.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor corriendo");
});
