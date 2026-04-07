# Chatroom App

A real-time chat application built with **Node.js**, **Express**, and **Socket.IO**.  
Users can choose a username and a display color before joining a shared chat room where messages are instantly broadcast to all connected users.

> The frontend is served directly from the Node.js backend, and chat history is stored in memory only.

---

## Features

- Real-time messaging powered by Socket.IO
    
- Username and color selection before joining
    
- Per-room message history for new users
    
- Automatic join/leave system messages
    
- Custom handwritten-style UI (served as static assets)
    

---

## Tech Stack

|Layer|Technology|
|---|---|
|Backend|Node.js, Express|
|Realtime|Socket.IO|
|Frontend|HTML, CSS, JavaScript|

---

## Application Flow

```text
Open form → Choose username & color → Join chat → Send and receive messages in real time
```

---

## Getting Started

### Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### Run the App

```bash
npm start
```

Then open your browser at:

```
http://localhost:3000
```

> [!TIP]  
> If the app doesn’t load, make sure port `3000` is available and the server is running.

---

## User Journey

1. Open the landing page
    
2. Enter a username
    
3. Choose a display color
    
4. Join the chat room
    
5. Send messages (press **Enter** or click send)
    

> Message history is temporary. Restarting the server will clear all messages.

---

## Project Structure

```
backend/
  └── server.js              # Express server + Socket.IO logic

frontend/
  ├── html/
  │   ├── form.html         # User setup screen
  │   └── chat-room.html    # Chat interface
  ├── js/
  │   ├── form.js           # Form validation & localStorage
  │   ├── chat.js           # Chat logic & socket events
  │   └── style.js          # Responsive scaling
  └── styles/
      ├── form.css          # Landing page styles
      └── chat-room.css     # Chat UI styles

package.json                # Dependencies & scripts
```

---

## Future Improvements

- Persist messages using a database
    
- Add user authentication
    
- Support multiple chat rooms
    
- Add deployment instructions for a cloud provider

---

## About This Project

> This project was built as a learning exercise to practice real-time apps with Node.js, Express, and Socket.IO. 
> 
> The design is inspired by other creator, just in some visual assets and elements were adapted for learning purposes.
