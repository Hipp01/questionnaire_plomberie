<template>
  <div class="bg-light">
    <div class="container">
      <h1>{{ currentQuestion.text }}</h1>
      <span class="wave"><img src="@/assets/icons/red-wave.svg" alt="Wave"/></span>
    </div>
    <div class="options">
      <div v-for="(option, index) in currentQuestion.options" :key="index" class="option-item">
        <button @click="currentAnswer = option.value">
          <span class="option-text">{{ option.value }}</span>
          <span class="arrow-icon">
            <img src="@/assets/icons/arrow.png" alt="Arrow">
          </span>
        </button>
      </div>
      <div class="previous-step-container">
        <button class="previous-step-button" @click="goToPreviousStep">
          <span class="arrow-icon-left">
            <img
              src="@/assets/icons/arrow-left.svg"
              alt="Arrow Left"
              class="arrow-left"
            />
          </span>
          Étape précédente
        </button>
      </div>
    </div>
    <GreenCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GreenCard from '@/components/GreenCard.vue';

export default defineComponent({
  name: 'PlomberiePage',
  components: {
    GreenCard,
  },
  data() {
    return {
      questions: [], // Contiendra toutes les questions et sous-questions
      currentQuestion: null, // Question actuelle
      currentAnswer: null, // Réponse de l'utilisateur à la question actuelle
      currentSubQuestion: null, // Sous-question actuelle
      currentSubAnswer: null, // Réponse à la sous-question
      isComplete: false, // Si le questionnaire est complet
      questionIndex: 0, // Indice pour suivre la question actuelle
      subQuestionIndex: 0, // Indice pour suivre la sous-question actuelle
    };
  },
  async mounted() {
    // Charger les questions depuis un fichier JSON externe (API ou fichier local)
    await this.loadQuestions();
  },
  methods: {
    // Cette fonction va récupérer les questions depuis un fichier JSON ou une API
    async loadQuestions() {
      try {
        // Simulation de la récupération du fichier JSON (remplacer par une requête API si nécessaire)
        const response = await fetch('/questions.json'); // Remplace le chemin par celui du fichier JSON
        console.log(response);
        const jsonData = await response.json();
        console.log('Questions loaded:', jsonData.questions);

        this.questions = jsonData.questions;
        this.currentQuestion = this.questions[0]; // La première question est sélectionnée par défaut
      } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
      }
    },
  },
});
</script>

<style scoped>
.bg-light {
  height: 100vh;
}

h1 {
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
  color: black;
  font-size: 34px;
  font-weight: 700;
  line-height: 51px;
}

.wave {
  display: block;
  margin: 0 auto;
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
  content: url('@/assets/icons/arrow-left-white.svg'); /* Change the arrow icon to white on hover */
}
</style>
