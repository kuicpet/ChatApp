const app = require('express')();
const fs = require('fs');
const ent = require('ent');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

//loading the page
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//setting up socket connection
io.sockets.on('connection',(socket,username) => {
    //when the username is received it's stored as session variable and informs the other peopele
    socket.on('new_client',(username) => {
        username = ent.encode(username);
        socket.username = username;
        socket.broadcast.emit('new_client',username);
    });
    //when message is received,the client's username is received and sent to other people.
    socket.on('message',(message) => {
        message = ent.encode(message);
        socket.broadcast.emit('message',{ username: socket.username, message: message});
    });
});






server.listen(8080);






