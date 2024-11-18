import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/depannage')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));