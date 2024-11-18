import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb://127.0.0.1:27017/depannage';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    console.log('Connexion à MongoDB réussie.');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    process.exit(1);
  }
};

export default connectDB;
