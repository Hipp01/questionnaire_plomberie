<template>
  <div class="bg-green">
    <div class="container">
      <div class="align">
        <img src="@/assets/icons/tick.png" alt="Tick"/>
        <p>Plus de <strong>1500 professionnels qualifiés</strong>, recrutés selon des critères et un processus stricts</p>
      </div>
      <div class="align">
        <img src="@/assets/icons/tick.png" alt="Tick"/>
        <p>Fourchette tarifaire <strong>connue à l’avance</strong>, incluant le déplacement ainsi qu’un devis gratuit</p>
      </div>
      <div class="align">
        <img src="@/assets/icons/tick.png" alt="Tick"/>
        <p>Intervention <strong>7j/7 24h/24</strong> pour les dépannages d’urgence</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GreenCard',
});

</script>

<style scoped>
.bg-green {
  margin-top: 20px;
  padding-inline: 40px;
  padding-block: 20px;
  width: 50%;
  background-color: #DEFAE9;
  display: flex;
  justify-self: center;
  justify-content: center;
}

img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.container {
  text-align: start;
  color: var(--background-dark);
}

.align {
  display: flex;
  align-items: center;
}

p {
  font-size: 15px;
  margin: 0;
}
</style>
