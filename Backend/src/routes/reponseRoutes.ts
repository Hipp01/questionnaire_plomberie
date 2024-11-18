import express, { Request, Response } from 'express';
import { getReponseById } from '../controllers/reponseController';


const router = express.Router();

// Routes pour les réponses
router.get('/:id', getReponseById);

export default router;
