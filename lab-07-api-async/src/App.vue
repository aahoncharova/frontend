
<template>
  <div class="container">
    <h1>API Post Catalog</h1>

    <div v-if="isLoading" class="loader">Loading...</div>

    <div v-else-if="error" class="error-card">
      <p>Error: {{ error }}</p>
      <button @click="loadItems">Try Again</button>
    </div>

    <div v-else-if="items.length > 0">
    </div>

    <div v-else>No data found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const isLoading = ref(false)
const error = ref(null)

const loadItems = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) throw new Error('Failed to fetch data')
    items.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(loadItems)
</script>


<style scoped>
.container {
  max-width: 700px;
  margin: 10px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
}
h1 {
  color: #42b983;
  margin-bottom: 24px;
  text-align: center;
}
.loader {
  color: #42b983;
  font-size: 1.2rem;
  text-align: center;
  margin: 32px 0;
}
.error-card {
  background: #ffeaea;
  color: #c0392b;
  border-radius: 8px;
  padding: 18px 24px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(192,57,43,0.08);
}
.error-card button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s;
}
.error-card button:hover {
  background: #2c8c6b;
}
</style>
