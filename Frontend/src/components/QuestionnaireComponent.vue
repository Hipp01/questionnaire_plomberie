<template>
  <div class="questionnaire">
    <div v-if="question">
      <div class="container">
        <h1>{{ question.text }}</h1>
      </div>
      <span class="wave"><img src="@/assets/icons/red-wave.svg" alt="Wave" /></span>
      <div class="options">
        <div v-for="(option, index) in question.options" :key="option.id" class="option-item">
          <button
            v-bind:style="isOdd && option.id === 'extra-option' ? { display: 'none' } : {}"
            @click="handleOptionClick(option.id, option.nextQuestionId, index + 1)"
          >
            <span class="option-text">{{ option.text }}</span>
            <span class="arrow-icon">
              <img src="@/assets/icons/arrow.png" alt="Arrow" />
            </span>
          </button>
        </div>
        <div class="previous-step-container">
          <button class="previous-step-button" @click="goToPreviousStep">
            <span class="arrow-icon-left">
              <img src="@/assets/icons/arrow-left.svg" alt="Arrow Left" class="arrow-left" />
            </span>
            Étape précédente
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement de la question...</p>
    </div>
  </div>
</template>

<script>
import { getQuestionById } from "@/api/questionsService";
import router from "@/router";

export default {
  data() {
    return {
      question: null, // Stocke les données de la question actuelle
      isOdd: false, // Variable pour vérifier si le nombre d'options est impair
      questionPath: [], // Historique des questions et options sélectionnées
      strQuestionPath: "", // Chemin de la question sous forme de chaîne
    };
  },
  props: {
    initialQuestionId: {
      type: String,
      required: true, // L'ID de la première question doit être fourni
    },
  },
  async created() {
    await this.loadQuestion(this.initialQuestionId); // Charger la première question
  },
  methods: {
    /**
     * Charge une question par son ID personnalisé et met à jour les données du composant.
     * @param {string} questionId - ID personnalisé de la question à charger.
     */
    async loadQuestion(questionId) {
      try {
        this.question = await getQuestionById(questionId); // Appel à l'API
        this.isOdd = this.question.options.length % 2 !== 0; // Vérifie si le nombre d'options est impair
        if (this.isOdd) {
          // Ajouter une option vide pour rendre le nombre pair
          this.question.options.push({ text: "", id: "extra-option", nextQuestionId: null });
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la question :", error);
        this.question = null; // Réinitialiser la question en cas d'erreur
      }
    },
    /**
     * Gestionnaire de clic pour une option de réponse.
     * @param {string} optionId - ID personnalisé de l'option sélectionnée.
     * @param {string} nextQuestionId - ID personnalisé de la question suivante.
     * @param {number} optionIndex - Position de l'option dans le tableau (commence à 1).
     */
    async handleOptionClick(optionId, nextQuestionId, optionIndex) {
      this.questionPath.push({ questionId: this.question.id, optionId, optionIndex }); // Ajouter l'option choisie au chemin
      this.strQuestionPath = this.strQuestionPath + `${this.question.id}`; // Ajouter l'option choisie au chemin sous forme de chaîne
      console.log("Chemin actuel :", this.strQuestionPath);
      if (!nextQuestionId) {
        // Si l'ID de la question suivante est null, finaliser le questionnaire
        await this.fetchResult(); // Récupérer le résultat
        return;
      }
      await this.loadQuestion(nextQuestionId); // Charger la question suivante
    },
    /**
     * Fonction pour récupérer la réponse API basée sur le chemin parcouru.
     */
    async fetchResult() {
      try {
        // Construction de l'ID final
        const lastStep = this.questionPath[this.questionPath.length - 1];
        let id = `1${this.strQuestionPath}`; // Commence par "1" suivi de l'ID de la dernière question
        // Ajouter la position de l'option si aucune question suivante
        if (!this.question.nextQuestionId) {
          id += `_${lastStep.optionIndex}`;
        }
        console.log("ID final :", id);
        // const response = await getResponseById(id); // Appel à l'API avec l'ID construit
        // console.log("Réponse obtenue :", response);

        // Rediriger vers /result avec les données récupérées
        router.push({ path: '/result', query: { resultId: id } });
      } catch (error) {
        console.error("Erreur lors de la récupération du résultat :", error);
      }
    },
    /**
     * Fonction pour naviguer vers la question précédente.
     */
    async goToPreviousStep() {
      if (this.questionPath.length > 0) {
        // Retirer la dernière entrée du chemin
        const lastStep = this.questionPath.pop();
        this.strQuestionPath = this.strQuestionPath.slice(0, -1); // Retirer la dernière option du chemin sous forme de chaîne
        await this.loadQuestion(lastStep.questionId); // Charger la question précédente
      } else {
        console.log("Aucune question précédente disponible.");
      }
    },
  },
};
</script>

<style scoped>
.bg-light {
  height: 100vh;
}

h1 {
  margin-top: auto;
  padding-top: 30px;
  text-align: center;
  color: black;
  font-size: 34px;
  font-weight: 700;
  line-height: 51px;
}

.wave {
  display: block;
  margin: 0 auto;
  padding-bottom: 20px;
  width: 100px;
}

.options {
  width: 50%;
  padding: 40px;
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 70px;
  background-color: var(--text-white);
  border-radius: 10px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Créer 2 colonnes de largeur égale */
  gap: 15px;
}

.option-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  padding-inline-start: 15px;
  background-color: var(--background-grey);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 12px;
  font-weight: 600;
}

button:hover {
  color: var(--primary-color);
  background-color: var(--light-pink)
}

.option-text {
  flex-grow: 1;
  text-align: left;
}

.arrow-icon {
  margin-left: 10px;
}

.arrow-icon img {
  width: 30px;
}

.previous-step-container {
  position: relative;
}

.previous-step-button {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 180px;
  height: 36px;
  top: 15px;
  background: #ffffff;
  border: 1px solid #ff445f;
  border-radius: 43px;
  font-size: 12px;
  color: #ff445f;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  padding-block: 20px;
  padding-right: 10px;
}

.arrow-left {
  width: 30px;
  margin-left: 5px;
  margin-top: 5px;
  transition: filter 0.3s ease;
}

.previous-step-button:hover {
  background: #ff445f;
  color: #ffffff;
}

.previous-step-button:hover .arrow-left {
  content: url('@/assets/icons/arrow-left-white.svg');
}
</style>
