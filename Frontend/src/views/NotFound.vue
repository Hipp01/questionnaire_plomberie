<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
h1,
p {
  color: black;
}
.not-found {
  text-align: center;
  margin-top: 50px;
  height: 80vh;
  padding: 20px;
  overflow: hidden;
  background-color: var(--background-light);
}

.not-found h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.not-found a {
  font-size: 1.2em;
  color: var(--primary-color);
  text-decoration: none;
}
</style>
