import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import * as validationController from '../controllers/validationController.js';

const router = express.Router();

router.post('/register', authenticateToken, validationController.registerValidator);
router.get('/validator/:userId', validationController.isValidator);
router.post('/:scriptId', authenticateToken, validationController.submitValidation);
router.get('/:scriptId', validationController.getValidations);
router.get('/:scriptId/score', validationController.getAggregatedScore);
router.get('/top', validationController.getTopScript);

export default router;

