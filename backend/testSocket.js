const { io } = require('socket.io-client');

const socket = io('http://89.116.236.24:3000', {
  path: '/pizza',
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('✅ Connected to socket:', socket.id);

  socket.on('newOrder', (data) => {
    console.log('📨 Received newOrder:', data);
  });

  setTimeout(() => {
    console.log('➡️  Emitting newOrder event');
    socket.emit('newOrder', { test: 'hello from client' });
  }, 2000);
});

socket.on('disconnect', (reason) => {
  console.log('⚠️ Disconnected:', reason);
});
