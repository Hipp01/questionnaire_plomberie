import mongoose from 'mongoose';
import app from './app';
import initDB from './initDB';  // Importer la fonction d'initialisation

const PORT = process.env.PORT || 5000;

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/depannage')
  .then(async () => {
    // Initialisation de la base de données (insertion des questions et réponses)
    await initDB();

    // Démarrer l'application après l'initialisation de la DB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));
