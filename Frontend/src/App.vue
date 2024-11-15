<template>
  <div id="app">
    <!-- Affiche le header si la métadonnée hideHeader n'est pas définie ou est fausse -->
    <HeaderComponent v-if="!$route.meta.hideHeader" />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    Footer,
    HeaderComponent,
  },
});
</script>
