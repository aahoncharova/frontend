<template>
  <div class="lab-03">
    <h2>Task 1: Page States</h2>
    
    <div class="controls">
      <button @click="isLoading = !isLoading">Toggle Loading</button>
      <button @click="hasError = !hasError">Toggle Error</button>
      <button @click="items = items.length ? [] : ['Apple', 'Banana', 'Pear']">Toggle Items</button>
    </div>

    <div class="status-container">
      <div v-if="isLoading" class="loading">⏳ Loading...</div>
      
      <div v-else-if="hasError" class="error">❌ Error loading data!</div>
      
      <div v-else-if="items.length === 0" class="empty">📭 List is empty</div>
      
      <ul v-else class="item-list">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      hasError: false,
      items: []
    }
  }
}
</script>

<style scoped>
.lab-03 {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.controls button {
  flex: 1;
  min-width: 150px;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: 0.3s;
}

.controls button:hover {
  background-color: #369970;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.3);
}

.status-container {
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  color: #2196f3;
  font-weight: bold;
  font-size: 1.3em;
  text-align: center;
}

.error {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.3em;
  text-align: center;
}

.empty {
  color: #888;
  font-style: italic;
  font-size: 1.2em;
  text-align: center;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.item-list li {
  background-color: #f5f5f5;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 5px;
  color: #333;
  border-left: 4px solid #42b983;
  transition: 0.2s;
}

.item-list li:hover {
  background-color: #efefef;
  transform: translateX(5px);
}
</style>