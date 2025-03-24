const WebSocket = require('ws');
const port = process.env.PORT || 8080; // Use Render’s port or 8080 locally
const server = new WebSocket.Server({ port: port });

server.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        server.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server running on port ${port}`);
