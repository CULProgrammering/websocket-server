// Import the WebSocket library
const WebSocket = require('ws');

// Create a WebSocket server instance listening on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Array to store all connected clients
const clients = [];

// Event listener for new client connections
wss.on('connection', (ws) => {
    // Add the new client to the clients array
    clients.push(ws);
    console.log('Client connected');

    // Event listener for incoming messages from this client
    ws.on('message', (message) => {
        console.log('Received: ' + message);
        // Broadcast the message to all connected clients
        clients.forEach((client) => {
            // Check if the client's connection is still open
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Event listener for when a client disconnects
    ws.on('close', () => {
        // Remove the client from the clients array
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');