const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variable for password
const ART_PASSWORD = process.env.ART_PASSWORD || 'Devayani2006';

// Password validation endpoint
app.post('/api/validate-password', (req, res) => {
    const { password } = req.body;
    
    if (password === ART_PASSWORD) {
        res.json({ valid: true });
    } else {
        res.status(401).json({ valid: false });
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Handle all routes for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Export the Express API
module.exports = app;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 