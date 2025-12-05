import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.js';
import * as movieController from '../controllers/movieController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/:scriptId/generate', authenticateToken, movieController.startMovieGeneration);
router.get('/:scriptId', movieController.getMovie);
router.post('/:scriptId/progress', movieController.updateMovieProgress);
router.post('/upload', upload.single('movie'), movieController.uploadMovie);

export default router;

