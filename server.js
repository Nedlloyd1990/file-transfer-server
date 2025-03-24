const WebSocket = require('ws');
const port = process.env.PORT || 8080; // Use Render’s port or 8080 locally
const server = new WebSocket.Server({ port: port });

server.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        // Convert message to string if it’s a Buffer (Render might send binary)
        const messageString = message.toString('utf8');
        console.log('Received message:', messageString);
        // Broadcast to all connected clients except sender
        server.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(messageString);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.log('WebSocket error:', error);
    });
});

console.log(`WebSocket server running on port ${port}`);
