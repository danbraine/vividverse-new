import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import scriptRoutes from './routes/scripts.js';
import validationRoutes from './routes/validations.js';
import movieRoutes from './routes/movies.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/api/files', express.static(path.join(__dirname, '../uploads')));
app.use('/api/movies', express.static(path.join(__dirname, '../movies')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/validations', validationRoutes);
app.use('/api/movies', movieRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route - helpful message
app.get('/', (req, res) => {
  res.json({
    message: 'VividVerse Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      scripts: '/api/scripts',
      validations: '/api/validations',
      movies: '/api/movies'
    },
    note: 'This is the API server. Access the frontend at http://localhost:5173'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VividVerse Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, '../uploads')}`);
  console.log(`🎬 Movies directory: ${path.join(__dirname, '../movies')}`);
});

