const app = require('express')();
const port = process.env.PORT || 5000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Connection to socket established');

  socket.on('join-room', room => {
    console.log('someone is connected on room '+room);
    socket.join(room);
  });

  socket.on('message', data => {
    io.sockets.in(data.room).emit('message', data);
  });

  socket.on('event', event => {
    console.log('Received message from socket!', event);
  });

  socket.on('disconnect', () => {
    console.log('Server has disconnected');
  });
});

// console.log that your server is up and running
server.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});