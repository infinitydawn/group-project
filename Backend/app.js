// app.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Sample endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/test', (req, res) => {
    res.json({ message: 'test' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
