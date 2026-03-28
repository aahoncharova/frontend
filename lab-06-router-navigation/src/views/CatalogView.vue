<template>
  <div class="catalog">
    <h2>Product Catalog</h2>
    <div class="product-list">
      <div v-for="item in products" :key="item.id" class="product-item">
        <router-link :to="'/catalog/' + item.id">{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CatalogView',
  data() {
    return {
      products: [
        { id: 1, name: 'Smartphone' },
        { id: 2, name: 'Laptop' },
        { id: 3, name: 'Headphones' }
      ]
    }
  }
}
</script>
<style scoped>
.catalog {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
}
.catalog h2 {
  color: #42b983;
  margin-bottom: 24px;
  font-size: 2rem;
  text-align: center;
}
.product-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.product-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px 20px;
  transition: box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(66,185,131,0.04);
}
.product-item:hover {
  box-shadow: 0 4px 16px rgba(66,185,131,0.13);
}
.product-item a {
  color: #222;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.product-item a:hover {
  color: #42b983;
}
</style>
