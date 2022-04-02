const express = require('express');
const ACTIONS = require('./actions');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3001;
const { v4: uuid } = require('uuid');

const messages = [];
const users = new Map();

io.on("connection", socket => {
  socket.on(ACTIONS.JOIN, ({ name, id }) => {
    console.log("JOIN")
    users.set(id, name);
    socket.data = {
      id,
    }

    socket.broadcast.emit(ACTIONS.NEW_USER, [{
      id,
      name, 
    }])

    socket.emit(ACTIONS.NEW_USER, [...users.entries()].map(([id, name]) => ({
      name,
      id,
    })))

    socket.emit(ACTIONS.NEW_MESSAGE, messages)
  });

  function leaveRoom() {
    if (socket.data.id) {
      users.delete(socket.data.id)
    }
    socket.broadcast.emit(ACTIONS.USER_LEFT, socket.data.id)
  }

  socket.on(ACTIONS.SEND_MESSAGE, ({ text }) => {
    const messageInfo = {
      text,
      senderId: socket.data.id,
      senderName: users.get(socket.data.id),
      time: new Date(),
      id: uuid(),
    }
    messages.push(messageInfo);
    io.emit(ACTIONS.NEW_MESSAGE, [messageInfo])
  });

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on('disconnecting', leaveRoom);
})

server.listen(PORT, () => {
  console.log('Socket server started on port ' + PORT)
})

