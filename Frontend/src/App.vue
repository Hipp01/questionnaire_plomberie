<template>
  <div id="app">
    <router-view />
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/FooterComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    Footer,
  },
});
</script>
