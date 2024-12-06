require('dotenv').config();
const express = require('express');
const connectDB = require('./data/database');
const swaggerUiSetup = require('./data/swagger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger Documentation
swaggerUiSetup(app);

// API Routes
app.use('/api/users', userRoutes);

// Root Route for Testing
app.get('/', (req, res) => {
    res.send('API is running.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




