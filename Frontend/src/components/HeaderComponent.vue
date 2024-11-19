<template>
  <header class="header">
    <div class="goweb-btn"><span class="header-text"><a href="https://www.goweb.fr/" target="_blank">Goweb<span class="red-point">.</span></a></span></div>
    <button class="contact-button">Contact</button>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent',
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--text-white);
}
</style>
