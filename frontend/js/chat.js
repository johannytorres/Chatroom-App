const socket = io();

const ROOM = "main-room";

const myUsername = localStorage.getItem("chat_username");
const myColor = localStorage.getItem("chat_color");

if (!myUsername) {
  window.location.href = "index.html";
}

const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send");
const chatContainer = document.getElementById("chat-container");

const allowedColors = ["red","blue","green","yellow","purple","pink"];
let myColorSafe = allowedColors.includes(myColor) ? myColor : "yellow";


// conectar y unirse a sala
socket.on("connect", () => {
  console.log("Conectado:", socket.id);

  socket.emit("join-room", {
    room: ROOM,
    username: myUsername
  });
});


// -------- mensajes normales --------

function addMessage(username, text, color) {
  const sideClass = username === myUsername ? "me" : "other";

  const div = document.createElement("div");
  div.className = `message-div ${sideClass}`;

  div.innerHTML = `
    <div class="message-container">
      <div class="message-header ${color}">
        <div class="message-text-header ${color}">${username}</div>
      </div>

      <div class="message ${color}">
        <div class="message-text ${color}">${text}</div>
      </div>
    </div>
  `;

  chatContainer.appendChild(div);
  scrollToBottom();
}


// -------- mensajes sistema --------

function addSystemMessage(text) {
  const div = document.createElement("div");
  div.className = "system-message";
  div.textContent = text;

  chatContainer.appendChild(div);
  scrollToBottom();
}


// -------- enviar --------

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  socket.emit("chat-message", {
    room: ROOM,
    username: myUsername,
    color: myColorSafe,
    text: text
  });

  input.value = "";
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});


// -------- recibir --------

socket.on("chat-message", (data) => {
  addMessage(data.username, data.text, data.color);
});

socket.on("chat-history", (messages) => {
  console.log("HISTORIAL:", messages);

  messages.forEach(m => {
    addMessage(m.username, m.text, m.color);
  });

  scrollToBottom();
});

socket.on("system-message", (data) => {
  addSystemMessage(data.text);
});


// -------- scroll --------

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}


// -------- focus --------

window.addEventListener("load", () => {
  input.focus();
});
