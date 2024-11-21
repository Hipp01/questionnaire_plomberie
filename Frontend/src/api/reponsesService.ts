import axios from 'axios';

const API_URL = 'http://localhost:5000/reponses';

/**
 * Récupère une réponse par son identifiant (id).
 * @param id - Identifiant de la réponse.
 * @returns La réponse récupérée sous forme d'objet.
 */
export const getResponseById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Réponse récupérée :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la réponse :', error);
    throw error; // Propager l'erreur pour une gestion ultérieure
  }
};
