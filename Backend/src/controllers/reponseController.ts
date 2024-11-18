import { Request, Response } from 'express';
import Reponse from '../models/Reponse';

// Récupérer une question par son ID
export const getReponseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reponse = await Reponse.findOne({ id }); // Recherche par le champ id
    if (!reponse) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(reponse);
  } catch (error) {
    res.status(500).json({ message: 'Error while getting the response' });
  }
};