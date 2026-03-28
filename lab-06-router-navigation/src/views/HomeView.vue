<template>
  <div class="home-view">
    <h2>Welcome to the Home Page</h2>
    <p>Explore our product catalog and learn more about us!</p>
  </div>
</template>
<script>
export default {
  name: 'HomeView'
}
</script>
<style scoped>
.home-view {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
  text-align: center;
}
.home-view h2 {
  color: #42b983;
  margin-bottom: 18px;
  font-size: 2rem;
}
.home-view p {
  font-size: 1.1rem;
  color: #444;
}
</style>
