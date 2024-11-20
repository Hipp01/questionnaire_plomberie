<template>
  <div class="result-page">
    <!-- Carte de gauche -->
    <div class="left-card">
      <img :src="'/images/' + result.path.split(';')[1].replace(/ /g, '').replace('/','_').toLowerCase() + '.png'" alt="Image" />
      <h2>Bon à savoir</h2>
      <p>
        Vous faites face à un problème {{ result.path.split(';')[1] !== ' Autre ' ? 'de ' + result.path.split(';')[1] : 'autre' }} ?
        Vous vous interrogez sur les raisons de ce blocage et les solutions pour y remédier ?
        Faites appel à un plombier de MesDépanneurs.fr pour une intervention rapide et efficace.
      </p>
      <p>Informations utiles pour le cas "{{ result.path.split(';')[result.path.split(';').length - 3] }}"</p>
      <p>{{ result.infos[0] }}</p>
      <ul>
        <li v-for="(info, index) in result.infos.slice(1)" :key="index + 1">
          - {{ info }}
        </li>
      </ul>

      <p>{{ result.text.split(';')[0] }}</p>
      <p>{{ result.text.split(';')[1] }}</p>
    </div>

    <!-- Carte de droite -->
    <div class="right">
      <div class="right-card">
        <h2>{{ result.title }}</h2>
        <ul>
          <li>
            <img src="@/assets/icons/euro.svg" alt="Euro" />
            <span>{{ result.couts[0] }}</span>
          </li>
          <li v-for="(cout, index) in result.couts.slice(1)" :key="index + 1">
            <img src="@/assets/icons/check.svg" alt="Check" />
            <span>{{ cout }}</span>
          </li>
        </ul>
        <button @click="handleClick">{{ constantCard.buttonText }}</button>
      </div>
      <div class="under-right-card">
        <p><strong>{{ constantCard.footerText[0] }}</strong></p>
        <p>{{ constantCard.footerText[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getResponseById } from '@/api/reponsesService';
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      // Données constantes pour la carte de droite
      constantCard: {
        buttonText: "Demander une intervention",
        footerText:
          ["Vous êtes recontactés sous 20 minutes après votre passage de commande.",
          "Si l'origine de votre panne nécessite un diagnostic complémentaire, il s'agit d'une intervention à part entière demandant l'expertise d'un professionnel. Celle-ci fera l'objet d'une facturation."
        ],
      },
      result: {
        description: '',
        title: '',
        infos: [] as string[],
        path: '',
        text: '',
        couts: [] as string[],
      },
    };
  },
  async created() {
    try {
      const query = this.$route.query;
      console.log("Paramètres de la route :", query.resultId);

      if (query.resultId && typeof query.resultId === 'string') {
        // Récupérer les données de réponse
        await this.fetchResponseData(query.resultId);
      } else {
        console.error("L'ID de réponse est manquant ou invalide dans les paramètres de requête.");
      }
    } catch (error) {
      console.error("Erreur lors du traitement des paramètres de la route :", error);
    }
  },
  methods: {
    handleClick() {
      router.push({ path: '/intervention', query: { resultId: this.$route.query.resultId } });
    },
    async fetchResponseData(responseId: string) {
      try {
        const response = await getResponseById(responseId);

        if (response) {
          console.log("Données de réponse récupérées avec succès :", response);

          // Assurez-vous que la structure de la réponse correspond à vos attentes
          this.result = {
            description: response.description || '',
            title: response.title || '',
            infos: response.infos || [],
            path: response.path || '',
            text: response.text || '',
            couts: response.couts || [],
          };
        } else {
          console.warn("Aucune donnée retournée par l'API pour l'ID :", responseId);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de réponse :", error);
      }
    },
  },
});
</script>


<style scoped>
.result-page {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: var(--background-light);
}

.left-card {
  width: 45%;
  align-self: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-left: auto;
  margin-right: 20px;
}

.right {
  width: 25%;
  margin-right: auto;
}

.right-card {
  background: var(--light-pink);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-left: 20px;
}

.right-card h2 {
  color: var(--primary-color);
  font-size: 1.5em;
  margin-bottom: 15px;
}

.left-card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.left-card h2 {
  color: var(--text-dark);
  font-size: 1.5em;
  margin-bottom: 15px;
}

.left-card ul,
.right-card ul {
  padding-left: 0px;
  margin: 30px 0;
  list-style-type: none;
}

.left-card li,
.right-card li {
  line-height: 1.8;
  color: var(--text-dark);
  font-family: var(--font-main);
  font-weight: 500;
}

.left-card li span,
.right-card li span {
  margin-left: 10px;
}

.right-card button {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  padding: 20px 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.right-card button:hover {
  background: var(--dark-red)
}

p {
  color: var(--text-dark);
  font-size: 16px;
  line-height: 1.5;
}

.under-right-card {
  margin-top: 20px;
  margin-left: 20px;
}

.right p {
  margin-top: 5px;
  margin-bottom: 0px;
  color: #666;
  font-size: 13px;
  line-height: 1.2;
}
</style>
