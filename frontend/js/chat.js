const socket = io();

const ROOM = "main-room";

// Load the current user's identity and preferred chat color from local storage.
const myUsername = localStorage.getItem("chat_username");
const myColor = localStorage.getItem("chat_color");

if (!myUsername) {
  window.location.href = "index.html";
}

// Cache the main UI elements used to send messages and render the chat stream.
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send");
const chatContainer = document.getElementById("chat-container");

// Restrict the active color to a known set so message styling stays consistent.
const allowedColors = ["red","blue","green","yellow","purple","pink"];
let myColorSafe = allowedColors.includes(myColor) ? myColor : "yellow";


// Connect to the server and join the shared chat room once the socket is ready.
socket.on("connect", () => {
  console.log("Conectado:", socket.id);

  socket.emit("join-room", {
    room: ROOM,
    username: myUsername
  });
});


// Render a regular chat message with alignment based on whether it was sent by the current user.

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


// Render a system message for join/leave notices and other room events.

function addSystemMessage(text) {
  const div = document.createElement("div");
  div.className = "system-message";
  div.textContent = text;

  chatContainer.appendChild(div);
  scrollToBottom();
}


// Send the current input value to the server, then clear the field.

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


// Handle incoming messages and replay the saved chat history on load.

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


// Keep the newest content visible by scrolling the container to the bottom.

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}


// Focus the message input as soon as the page is fully loaded.

window.addEventListener("load", () => {
  input.focus();
});
