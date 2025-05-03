const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const alumniRoutes = require('./routes/alumni');
const { errorHandler } = require('./middleware/errorMiddleware');
const rateLimit = require('express-rate-limit');
const path = require('path');

dotenv.config();

const app = express();

// ====== Connect to MongoDB ======
connectDB();

// ====== Global Middleware ======
app.use(cors());
app.use(express.json());

// ====== Rate Limiting for Auth Routes ======
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests, please try again later' },
});
app.use('/api/auth', authLimiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ====== Routes ======
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);

// ====== Error Handler ======
app.use(errorHandler);

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
