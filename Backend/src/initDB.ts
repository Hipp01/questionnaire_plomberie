import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Question from './models/Question';
import Reponse from './models/Reponse';

const initDB = async () => {
  try {
    // Charger les fichiers JSON
    const questionsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/questions.json'), 'utf-8')
    );
    const reponsesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/reponses.json'), 'utf-8')
    );

    // Nettoyer les collections existantes
    await Question.deleteMany({});
    console.log('Collection "Question" vidée.');
    await Reponse.deleteMany({});
    console.log('Collection "Reponse" vidée.');

    // Insérer les données dans la collection Question
    await Question.insertMany(questionsData);
    console.log(`${questionsData.length} questions insérées.`);

    // Insérer les données dans la collection Reponse
    const mappedReponses = reponsesData.map((reponse: any) => ({
      id: reponse.id,
      path: reponse.path,
      text: reponse.text,
      title: reponse.title || '',  // Ajouter une valeur par défaut si title est manquant
      infos: reponse.infos || [],  // Ajouter un tableau vide si infos est manquant
      couts: reponse.couts || [],  // Ajouter un tableau vide si couts est manquant
    }));

    // Vérifier les réponses qui manquent des champs
    mappedReponses.forEach((reponse: any) => {
      if (!reponse.title) {
        console.warn(`Réponse manquante 'title' : ${reponse.id}`);
      }
      if (!reponse.infos) {
        console.warn(`Réponse manquante 'infos' : ${reponse.id}`);
      }
      if (!reponse.couts) {
        console.warn(`Réponse manquante 'couts' : ${reponse.id}`);
      }
    });

    // Insérer les réponses dans la base de données
    await Reponse.insertMany(mappedReponses);
    console.log(`${reponsesData.length} réponses insérées.`);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données :', error);
  }
};

export default initDB;
