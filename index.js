const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/guest-posts', require('./routes/guestPosts'));
app.use('/api/upload', require('./routes/upload'));
app.use('/sitemap.xml', require('./routes/sitemap'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));