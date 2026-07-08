const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const uploadRoutes = require('./routes/upload');

const app = express();

const allowedOrigins = [process.env.FRONTEND_ORIGIN].filter(Boolean);

/* app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
})); */


app.use(cors());

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Custom builder backend is running' });
});

app.use('/api/custom-builder', uploadRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({ success: false, message: err.message });
  }
  return res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Custom builder backend running on port ${PORT}`);
});
