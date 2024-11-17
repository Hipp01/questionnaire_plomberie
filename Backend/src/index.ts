import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Route pour récupérer une question par ID
app.get('/questions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ id });
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la question' });
  }
});

// Route pour mettre à jour une question
app.put('/questions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la question' });
  }
});

// Route pour supprimer une question
app.delete('/questions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.json({ message: 'Question supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la question' });
  }
});

// Démarrage du serveur
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/depannage')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
