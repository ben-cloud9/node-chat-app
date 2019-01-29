const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {Users} = require('./utils/users.js')
const {isRealString} = require('./utils/validation.js')
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('name and room name are reqiured');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave(params.room);

    //io.emit -> io.to(params.room).emit
    //socket.braodcast.emit -> socket.broadcast.to(params.room).emit
    //socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });
  socket.on('createMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(newMessage.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));  
    }

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var user =  users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
});