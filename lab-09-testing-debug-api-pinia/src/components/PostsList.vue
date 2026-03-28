<template>
  <div class="container">
    <h1>API Post Catalog</h1>

    <div class="toolbar">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search posts..."
        class="search-input"
        @input="onSearch"
      >
    </div>

    <div v-if="isLoading" class="loader">Завантаження...</div>

    <div v-else-if="error" class="error-card">
      <p>Помилка: {{ error }}</p>
      <button @click="postsStore.fetchItems()">Try Again</button>
    </div>

    <div v-else-if="items.length > 0" class="list">
      <article v-for="post in items" :key="post.id" class="post-item">
        <small>ID: {{ post.id }}</small>
        <h3>{{ post.title }}</h3>
      </article>
    </div>
    <div v-if="!isLoading && !error && items.length === 0">Немає даних</div>
    
    <div class="pagination">
      <button :disabled="isLoading || page <= 1" @click="goPrev">Previous</button>
      <span>Page {{ page }}</span>
      <button :disabled="isLoading" @click="goNext">Next</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePostsStore } from '../store/postsStore'
import { storeToRefs } from 'pinia'

const postsStore = usePostsStore()
const { items, isLoading, error, page, query } = storeToRefs(postsStore)

const searchInput = ref(query.value)

function onSearch() {
  postsStore.query = searchInput.value
  postsStore.page = 1
  postsStore.fetchItems()
}

function goNext() {
  postsStore.page += 1
  postsStore.fetchItems()
}

function goPrev() {
  if (postsStore.page <= 1) return
  postsStore.page -= 1
  postsStore.fetchItems()
}

watch(query, (newValue) => {
  if (newValue !== searchInput.value) {
    searchInput.value = newValue
  }
})

onMounted(() => {
  postsStore.fetchItems()
})
</script>

<style scoped>
.container {
  max-width: 860px;
  margin: 24px auto;
  background: linear-gradient(180deg, #ffffff 0%, #f6fffb 100%);
  border: 1px solid #d7f3e7;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(22, 101, 52, 0.08);
  padding: 32px;
}
h1 {
  color: #1f9d6e;
  margin-bottom: 20px;
  text-align: left;
  margin-top: 0;
  font-size: 2rem;
  letter-spacing: 0.01em;
}
.loader {
  color: #1f9d6e;
  font-size: 1.2rem;
  text-align: center;
  margin: 32px 0;
}
.toolbar {
  margin-bottom: 16px;
}
.search-input {
  width: 100%;
  border: 1px solid #bfead8;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 1rem;
  color: #1f2937;
}
.search-input:focus {
  outline: 2px solid #7dddb8;
  border-color: #1f9d6e;
}
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.post-item {
  background: #ffffff;
  border: 1px solid #e3f5ec;
  border-radius: 14px;
  padding: 18px 18px 16px 18px;
  box-shadow: 0 4px 14px rgba(15, 76, 56, 0.06);
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.post-item:hover {
  transform: translateY(-2px);
  border-color: #b8e8d3;
  box-shadow: 0 10px 22px rgba(15, 76, 56, 0.12);
}
.post-item h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #1f2937;
  line-height: 1.35;
  text-align: left;
}
.post-item p {
  color: #374151;
  font-size: 1rem;
  margin: 0 0 12px 0;
  line-height: 1.5;
  text-align: left;
}
.post-item small {
  color: #6b7280;
  font-weight: 600;
  text-align: left;
}
.error-card {
  background: #fff1f1;
  color: #c0392b;
  border: 1px solid #ffd4d0;
  border-radius: 12px;
  padding: 18px 24px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(192,57,43,0.08);
}
.error-card button {
  background: #1f9d6e;
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
  background: #187f58;
}
.pagination {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.pagination button {
  background: #1f9d6e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}
.pagination button:disabled {
  background: #d7d7d7;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .container {
    margin: 12px;
    padding: 20px;
    border-radius: 14px;
  }

  h1 {
    font-size: 1.6rem;
  }
}
</style>
