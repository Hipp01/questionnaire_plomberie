import express from 'express';
import { getQuestionById } from '../controllers/questionController';

const router = express.Router();

// Routes pour les questions
router.get('/:id', getQuestionById);

export default router;
