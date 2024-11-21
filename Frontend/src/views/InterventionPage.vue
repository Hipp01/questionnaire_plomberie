<template>
  <div class="result-page">
    <!-- Carte de gauche -->
    <div class="left-card">
      <form>
        <div class="title-form">
          <div class="number">1</div>
          <h2>Informations</h2>
        </div>
        <div class="informations">
          <div>
            <fieldset :class="getValidationClass('prenom')">
              <legend>Prénom<span class="star">*</span></legend>
              <input
                type="text"
                v-model="formData.prenom"
                @blur="validateField('prenom')"
                maxlength="50"
              />
            </fieldset>
            <p class="champ-prenom">Ce champ est requis</p>
          </div>
          <div>
            <fieldset :class="getValidationClass('nom')">
              <legend>Nom<span class="star">*</span></legend>
              <input
                type="text"
                v-model="formData.nom"
                @blur="validateField('nom')"
                maxlength="50"
              />
            </fieldset>
            <p class="champ-nom">Ce champ est requis</p>
          </div>
          <div>
            <fieldset :class="getValidationClass('adresse')">
              <legend>Adresse (numéro et voie)<span class="star">*</span></legend>
              <input
                type="text"
                v-model="formData.adresse"
                @blur="validateField('adresse')"
                maxlength="50"
              />
            </fieldset>
            <p class="champ-adresse">Ce champ est requis</p>
          </div>
          <div>
            <fieldset :class="getValidationClass('codePostal')">
              <legend>Code postal<span class="star">*</span></legend>
              <input
                type="text"
                v-model="formData.codePostal"
                @blur="validateField('codePostal')"
                maxlength="5"
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              />
            </fieldset>
            <p class="champ-codePostal">Ce champ est requis</p>
          </div>
          <div>
            <fieldset :class="getValidationClass('telephone')">
              <legend>Téléphone<span class="star">*</span></legend>
              <input
                type="text"
                v-model="formData.telephone"
                @blur="validateField('telephone')"
                maxlength="10"
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              />
            </fieldset>
            <p class="champ-telephone">Ce champ est requis</p>
          </div>
          <div>
            <fieldset :class="getValidationClass('email')">
              <legend>Email<span class="star">*</span></legend>
              <input
                type="email"
                v-model="formData.email"
                @blur="validateField('email')"
              />
            </fieldset>
            <p class="champ-email">Ce champ est requis</p>
          </div>
        </div>
        <div class="title-form">
          <div class="number">2</div>
          <h2>Mode de paiement</h2>
        </div>
        <div class="moyen-paiement">
          <div class="paiement">
            <p>Payer sur place</p>
            <input type="checkbox" value="surPlace" id="surPlace" />
          </div>
          <div class="paiement">
            <p>Payer en ligne</p>
            <input type="checkbox" value="enLigne" id="enLigne"/>
          </div>
        </div>
        <div class="checkboxes-conditions">
          <div class="conditions">
            <input type="checkbox" value="service" id="service" />
            <p for="conditions">J'accepte les <span class="text-blue" onclick="">conditions générales d’utilisation du service</span></p>
          </div>
          <div class="conditions">
            <input type="checkbox" value="retractation" id="retractation" />
            <p for="conditions">J’ai bien pris connaissance des <span class="text-blue">relatives au droit de rétractation</span></p>
          </div>
          <div class="conditions">
            <input type="checkbox" value="offres" id="offres" />
            <p for="conditions">Je souhaite recevoir par voie électronique des offres commerciales personnalisées</p>
          </div>
        </div>
        <div class="buttons-previous-next">
          <div class="previous-step-container">
            <button class="previous-step-button" @click="goToPreviousStep">
              <span class="arrow-icon-left">
                <img src="@/assets/icons/arrow-left.svg" alt="Arrow Left" class="arrow-left" />
              </span>
              Étape précédente
            </button>
          </div>
          <div class="commande">
            <button class="next-step-button" @click="goToNextStep($event)">
                Passer commande et payer en ligne
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Carte de droite -->
    <div class="right">
      <div class="right-card">
        <h2>{{ result.title }}</h2>
        <div class="wave">
          <img src="@/assets/icons/red-wave.svg" alt="Wave" />
        </div>
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
      </div>
      <div class="under-right-card">
        <div class="second-right-card">
          <h2>Besoin d’une assistance téléphonique ?</h2>
          <button id="num-tel" @click="handleClick">Afficher le numéro</button>
        </div>
        <p><strong>{{ constantCard.footerText[0] }}</strong></p>
        <p>{{ constantCard.footerText[1] }}</p>
        <p>{{ constantCard.footerText[2] }}</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { getResponseById } from '@/api/reponsesService';
import router from '@/router';
import '@/assets/css/intervention.css';
import emailjs from 'emailjs-com';


export default defineComponent({
  data() {
    return {
      constantCard: {
        buttonText: "Demander une intervention",
        footerText: [
          "Vous êtes recontactés sous 20 minutes après votre passage de commande.",
          "L'artisan vous proposera un rendez-vous dès qu'il aura pris connaissance de votre commande.",
          "En cas de non acceptation du devis, aucun frais n'est engagé.",
        ],
      },
      result: {
        title: '',
        couts: [] as string[],
      },
      formData: {
        prenom: '',
        nom: '',
        adresse: '',
        codePostal: '',
        telephone: '',
        email: '',
      },
      errorMessages: {
        prenom: '',
        nom: '',
        adresse: '',
        codePostal: '',
        telephone: '',
        email: '',
      },
      validationState: {
        prenom: null as boolean | null,
        nom: null as boolean | null,
        adresse: null as boolean | null,
        codePostal: null as boolean | null,
        telephone: null as boolean | null,
        email: null as boolean | null,
      },
    };
  },
  /**
   * Méthode appelée lors de la création du composant (lifecycle hook `created`).
   *
   * Processus :
   * 1. Vérifie la présence de la query `resultId` dans l'URL.
   * 2. Si `resultId` est une chaîne de caractères valide, appelle la méthode `fetchResponseData` pour récupérer les données associées.
   * 3. En cas d'erreur lors du chargement des données, affiche un message d'erreur dans la console.
   *
   * @async
   */
  async created() {
    try {
      const query = this.$route.query;
      if (query.resultId && typeof query.resultId === 'string') {
        await this.fetchResponseData(query.resultId);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  },
  methods: {
    /**
     * Récupère et traite les données d'une réponse en fonction de son ID.
     * @async
     * @param responseId - L'identifiant unique de la réponse à récupérer.
     *
     * Processus :
     * 1. Effectue une requête asynchrone pour obtenir les données via `getResponseById`.
     * 2. Si une réponse valide est reçue :
     *    - Met à jour la propriété `result` avec les données de la réponse (titre et coûts).
     * 3. En cas d'erreur, affiche un message d'erreur dans la console.
     */
    async fetchResponseData(responseId: string) {
      try {
        const response = await getResponseById(responseId);
        if (response) {
          this.result = {
            title: response.title || '',
            couts: response.couts || [],
          };
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    /**
     * Valide un champ spécifique en fonction de son type et met à jour son état de validation.
     * @param field - Le champ à valider, correspondant à une clé dans `validationState`.
     *
     * Processus :
     * 1. Récupère la valeur du champ depuis `formData`.
     * 2. Détermine la validité selon des règles spécifiques à chaque champ (ex: longueur, format).
     * 3. Met à jour l'état de validation du champ dans `validationState`.
     * 4. Affiche ou masque le message d'erreur correspondant à ce champ.
     */
    validateField(field: keyof typeof this.validationState) {
      const value = this.formData[field];
      let isValid = false;

      switch (field) {
        case 'prenom':
        case 'nom':
          isValid = value.trim().length > 0;
          break;
        case 'adresse':
          isValid = value.trim().length > 5;
          break;
        case 'codePostal':
          isValid = /^\d{5}$/.test(value);
          break;
        case 'telephone':
          isValid = /^\d{10}$/.test(value);
          break;
        case 'email':
          isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          break;
      }

      this.validationState[field] = isValid;
      const errorElement = document.querySelector(`.champ-${field}`);
      if (errorElement) {
        (errorElement as HTMLElement).style.display = isValid ? 'none' : 'block'; // Montre ou cache l'élément
      }
    },

    /**
     * Renvoie une classe CSS en fonction de l'état de validation d'un champ spécifique.
     * @param field - Le champ à valider, correspondant à une clé dans `validationState`.
     * @returns - La classe CSS :
     *   - '' si l'état de validation est null,
     *   - 'valid' si le champ est valide,
     *   - 'invalid' si le champ est invalide.
     */
    getValidationClass(field: keyof typeof this.validationState) {
      return this.validationState[field] === null
        ? ''
        : this.validationState[field]
        ? 'valid'
        : 'invalid';
    },

    /**
     * Modifie le contenu textuel de l'élément HTML avec l'ID 'num-tel' pour afficher un numéro de téléphone spécifique.
     */
    handleClick() {
      const numTelElement = document.getElementById('num-tel');
      if (numTelElement) {
        numTelElement.textContent = '09 74 73 54 73';
      }
    },

    /**
     * Redirige l'utilisateur vers la page précédente avec les paramètres de requête actuels.
     */
    goToPreviousStep() {
      router.push({ path: '/result', query: { resultId: this.$route.query.resultId as string } });
    },

    /**
     * Valide le formulaire et gère la redirection ou l'envoi d'email en fonction de la validité des données.
     * Envoie un mail au dépanneur si le formulaire est valide, sinon affiche un message d'erreur.
     *
     * Cette fonction s'assure que tous les champs du formulaire sont correctement remplis et que les conditions générales ainsi que le droit de rétractation ont été acceptés. Si ces validations sont respectées, elle envoie un email avec les données du formulaire via EmailJS et redirige l'utilisateur vers la page d'accueil.
     *
     * Si un ou plusieurs champs sont invalides ou si une condition n'est pas acceptée, un message d'alerte est affiché pour indiquer à l'utilisateur ce qui doit être corrigé avant de pouvoir passer à l'étape suivante.
     *
     * @param {Event} event - L'objet événement de la soumission du formulaire. Il est utilisé pour empêcher l'envoi par défaut du formulaire et gérer la logique de validation.
     *
     * @throws {Error} Si une erreur se produit lors de l'envoi de l'email via EmailJS, une erreur est capturée et un message d'erreur est affiché à l'utilisateur.
     */
    goToNextStep(event: Event) {
      event.preventDefault();

      // Vérification de la validité des champs
      const isValid = Object.values(this.validationState).every((state) => state === true);
      if (!isValid) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
      }

      // Vérification des conditions
      const surPlace = (document.getElementById('surPlace') as HTMLInputElement).checked;
      const enLigne = (document.getElementById('enLigne') as HTMLInputElement).checked;
      const service = (document.getElementById('service') as HTMLInputElement).checked;
      const retractation = (document.getElementById('retractation') as HTMLInputElement).checked;

      if (!(surPlace || enLigne)) {
        alert('Veuillez sélectionner un mode de paiement.');
        return;
      }

      if (!service) {
        alert('Veuillez accepter les conditions générales d’utilisation du service.');
        return;
      }
      if (!retractation) {
        alert('Veuillez accepter les conditions relatives au droit de rétractation.');
        return;
      }

      const emailParams = {
        prenom: this.formData.prenom,
        nom: this.formData.nom,
        adresse: this.formData.adresse,
        codePostal: this.formData.codePostal,
        telephone: this.formData.telephone,
        email: this.formData.email,
        modePaiement: surPlace ? 'Sur place' : enLigne ? 'En ligne' : '',
        serviceAccepte: service ? 'Oui' : 'Non',
        retractationAcceptee: retractation ? 'Oui' : 'Non',
      };

      emailjs.send(
        'service_vvlnr9c',
        'template_rkfs64i',
        emailParams,
        'F1ySnhe-WmvCPZpzx'
      )
      .then((response) => {
        console.log('Email envoyé avec succès', response);
        alert('Commande passée avec succès ! Nous vous recontacterons dans les plus brefs délais.');
        router.push({ path: '/' });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'email', error);
        alert('Une erreur s\'est produite lors de l\'envoi de votre email.');
      });
    }
  },
});
</script>
