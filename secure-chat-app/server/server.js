const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet'); // Add this line
const connectDB = require('./config/db');

const app = express();

// Connect to the database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Enable CORS
app.use(cors());

// Use Helmet for security headers
app.use(helmet()); // Add this line

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/groupchats', require('./routes/groupChatRoutes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
