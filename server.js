
const express = require('express');
const app = express();
const path = require('path');

// Import route handlers
const adminRoutes = require('./routes/admin');
const iptvRoutes = require('./routes/iptv');

// Serve static files from a 'public' directory, if needed
app.use('/static', express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/admin', adminRoutes);  // Admin panel
app.use('/iptv', iptvRoutes);    // IPTV routes

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).json({
        error: '404: NOT_FOUND',
        code: 'NOT_FOUND'
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
