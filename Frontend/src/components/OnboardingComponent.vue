<template>
  <div class="onboarding">
    <h1 class="onboarding-title">Mon problème concerne :</h1>
    <div class="onboarding-decor">
      <span><img src="@/assets/icons/wave.svg" alt="Wave" /></span>
    </div>

    <div class="card-container">
      <div class="card" @click="redirectToPage('plomberie')" data-test="card-plomberie">
        <span class="icon">
          <img src="@/assets/icons/plomberie.png" alt="Plomberie" class="img-plomberie" />
        </span>
        <span class="card-text">Plomberie</span>
      </div>
      <div class="card" @click="redirectToPage('electricite')" data-test="card-electricite">
        <span class="icon">
          <img src="@/assets/icons/electricite.svg" alt="Électricité" class="img-electricite" />
        </span>
        <span class="card-text">Électricité</span>
      </div>
      <div class="card" @click="redirectToPage('chauffage')" data-test="card-chauffage">
        <span class="icon">
          <img src="@/assets/icons/chauffage.svg" alt="Chauffage" class="img-chauffage" />
        </span>
        <span class="card-text">Chauffage</span>
      </div>
      <div class="card" @click="redirectToPage('serrurerie')" data-test="card-serrurerie">
        <span class="icon">
          <img src="@/assets/icons/serrurerie.svg" alt="Serrurerie" class="img-serrurerie" />
        </span>
        <span class="card-text">Serrurerie</span>
      </div>
      <div class="card" @click="redirectToPage('vitrerie')" data-test="card-vitrerie">
        <span class="icon">
          <img src="@/assets/icons/vitrerie.svg" alt="Vitrerie" class="img-vitrerie" />
        </span>
        <span class="card-text">Vitrerie</span>
      </div>
      <div class="card" @click="redirectToPage('electromenager')" data-test="card-electromenager">
        <span class="icon">
          <img src="@/assets/icons/electromenager.svg" alt="Électroménager" class="img-electromenager" />
        </span>
        <span class="card-text">Électroménager</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'OnboardingComponent',
  setup() {
    const router = useRouter();

    // Méthode pour rediriger vers une page dédiée
    const redirectToPage = (page: string) => {
      router.push({ name: page }); // Naviguer vers la route avec le nom de la page
    };

    return {
      redirectToPage,
    };
  },
});
</script>
