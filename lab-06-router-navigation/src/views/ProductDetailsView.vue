<template>
  <div class="details">
    <h2>Product Details</h2>
    <p>Viewing info for product ID: {{ $route.params.id }}</p>
  </div>
</template>
<script>
export default {
  name: 'ProductDetailsView'
}
</script>
<style scoped>
.details {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
  text-align: center;
}
.details h2 {
  color: #42b983;
  margin-bottom: 18px;
  font-size: 1.7rem;
}
.details p {
  font-size: 1.1rem;
  color: #444;
}
</style>
