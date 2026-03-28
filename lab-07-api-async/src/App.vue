
<template>
  <div class="container">
    <h1>API Post Catalog</h1>

    <div v-if="isLoading" class="loader">Loading...</div>

    <div v-else-if="error" class="error-card">
      <p>Error: {{ error }}</p>
      <button @click="loadItems">Try Again</button>
    </div>


    <div v-else-if="items.length > 0">
      <div v-if="!selectedItem">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="search-input"
        />
        <div v-for="post in filteredItems" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <button @click="selectedItem = post">Details</button>
        </div>
        <div v-if="filteredItems.length === 0" class="no-results">No results found.</div>
      </div>
      <div v-else class="details-view">
        <button @click="selectedItem = null">← Back to List</button>
        <h2>{{ selectedItem.title }}</h2>
        <p>{{ selectedItem.body }}</p>
        <small>Post ID: {{ selectedItem.id }}</small>
      </div>
    </div>

    <div v-else>No data found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'


const items = ref([])
const isLoading = ref(false)
const error = ref(null)
const selectedItem = ref(null)
const searchQuery = ref('')

const filteredItems = computed(() => {
  return items.value.filter(post =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const loadItems = async () => {
  isLoading.value = true
  error.value = null
  selectedItem.value = null
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
.post-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 18px;
  box-shadow: 0 1px 4px rgba(66,185,131,0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-input {
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 22px;
  border: 1px solid #b2f2dd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.search-input:focus {
  border: 1.5px solid #42b983;
}
.no-results {
  color: #888;
  text-align: center;
  margin-top: 18px;
  font-size: 1.1rem;
}
.post-item h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #222;
}
.post-item button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.post-item button:hover {
  background: #2c8c6b;
}
.details-view {
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(66,185,131,0.08);
  padding: 32px 40px 24px 40px;
  margin: 32px auto;
  max-width: 500px;
  text-align: center;
}
.details-view button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 18px;
  transition: background 0.2s;
}
.details-view button:hover {
  background: #2c8c6b;
}
.details-view h2 {
  color: #42b983;
  margin-bottom: 12px;
}
.details-view p {
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 10px;
}
.details-view small {
  color: #888;
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
