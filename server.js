const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Serve static files from the 'public' folder
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
    console.log('a user connected');

    // When the client sends a message
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);  // Log received message
        io.emit('chat message', msg);  // Broadcast to all clients
    });
~    

    // When the client disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.use((req, res, next) => {
    console.log('Requested path:', req.url);  // Log the request URL
    next();  // Proceed to the next middleware
});

console.log('Serving static files from:', path.join(__dirname, 'public'));

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
