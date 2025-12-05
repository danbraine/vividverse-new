import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.js';
import * as scriptController from '../controllers/scriptController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authenticateToken, upload.single('file'), scriptController.submitScript);
router.get('/pending', scriptController.getPendingScripts);
router.get('/', scriptController.getAllScripts);
router.get('/:scriptId', scriptController.getScript);
router.get('/:scriptId/content', scriptController.getScriptContent);

export default router;

