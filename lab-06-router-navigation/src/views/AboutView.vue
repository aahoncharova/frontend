<template>
  <div class="about-view">
    <h2>About Us</h2>
    <p>This is a simple Vue 3 + Router demo project.</p>
  </div>
</template>
<script>
export default {
  name: 'AboutView'
}
</script>
<style scoped>
.about-view {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
  text-align: center;
}
.about-view h2 {
  color: #42b983;
  margin-bottom: 18px;
  font-size: 2rem;
}
.about-view p {
  font-size: 1.1rem;
  color: #444;
}
</style>
