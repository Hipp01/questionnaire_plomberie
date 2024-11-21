import axios from 'axios';

const API_URL = 'http://localhost:5000/questions';

/**
 * Récupère une question par son identifiant (id).
 * @param id - Identifiant de la question.
 * @returns La question récupérée sous forme d'objet.
 */
export const getQuestionById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Question récupérée :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la question :', error);
    throw error; // Propager l'erreur pour une gestion ultérieure
  }
};
