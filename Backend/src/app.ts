import express from 'express';
import dotenv from 'dotenv';
import QuestionRoutes from './routes/questionRoutes';
import ReponseRoutes from './routes/reponseRoutes';

dotenv.config();

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Plumbing Questionnaire API!',
      routes: {
        questions: '/questions/:id',
        reponses: '/reponses/:id',
      },
    });
});

// Routes
app.use('/questions', QuestionRoutes);
app.use('/reponses', ReponseRoutes);

export default app;
