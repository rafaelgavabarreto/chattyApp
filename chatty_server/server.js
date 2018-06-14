// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Variable to count users into the system
var onlineUsers = wss.clients.size;

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(user => {
        user.send(JSON.stringify(data));
        onlineUsers = wss.clients.size;
        console.log('Message sent from user to server');
    });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (ws) => {
    console.log('received message:', JSON.parse(ws));
    const userMessage = JSON.parse(ws);

    switch(userMessage.message.type) {
        case "postNotification": {
            wss.broadcast({
                id: uuid.v4(),
                ...userMessage.message,
                type: "IncomingNotification",
                onlineUsers
            });
            break;
        }
        case "postMessage": {
            wss.broadcast({
                id: uuid.v4(),
                ...userMessage.message,
                type: "IncomingMessage",
                onlineUsers
            });
            break;
        }
        default:
          throw new Error(`Event type undefined ${userMessage.message.type}`);
    }
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      console.log('Client disconnected');
      wss.broadcast(onlineUsers);
  });
});