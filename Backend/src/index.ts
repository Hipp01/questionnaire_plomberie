import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware pour accepter les requêtes JSON
app.use(express.json());

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// Démarrer le serveur
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export { app, server }; // Exporter l'application et le serveur pour les tests
