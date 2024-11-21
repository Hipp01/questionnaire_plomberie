import { Request, Response } from 'express';
import Question from '../models/Question';

// Récupérer une question par son ID
export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ id }); // Recherche par le champ id
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error while getting the question' });
  }
};