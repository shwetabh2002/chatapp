const io = require('socket.io')(8000);

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('send-chat-message', message => {
    console.log('Received message:', message);
    socket.broadcast.emit('chat-message', {
      message: message,
      name: socket.username
    });
  });

  socket.on('new-user', name => {
    console.log('User connected:', name);
    socket.username = name;
    socket.broadcast.emit('user-connected', name);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.username);
    socket.broadcast.emit('user-disconnected', socket.username);
  });
});
