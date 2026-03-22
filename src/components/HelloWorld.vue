<template>
  <div class="lab-03">
    <section class="task-section">
      <h2>Task 4: Dynamic Filtering</h2>

      <div class="filter-bar">
        <select v-model="filter" class="custom-select">
          <option value="all">All categories</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>
        <div class="badge">Shown {{ filteredProducts.length }} of {{ products.length }}</div>
      </div>

      <div v-if="filteredProducts.length === 0" class="empty-msg">
        🔍 No items found with this filter
      </div>

      <ul v-else class="item-list">
        <li v-for="p in filteredProducts" :key="p.id">
          <span>{{ p.title }}</span>
          <span class="tag">{{ p.category }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: 'all',
      products: [
        { id: 1, title: 'Apple', category: 'Fruit' },
        { id: 2, title: 'Carrot', category: 'Vegetable' },
        { id: 3, title: 'Banana', category: 'Fruit' },
        { id: 4, title: 'Tomato', category: 'Vegetable' }
      ]
    }
  },
  computed: {
    filteredProducts() {
      if (this.filter === 'all') return this.products;
      return this.products.filter(p => p.category === this.filter);
    }
  }
}
</script>

<style scoped>
  .lab-03 { 
    max-width: 600px; 
    margin: 20px auto; 
    padding: 30px; 
    font-family: sans-serif; 
    background-color: #f9f9f9; 
    border-radius: 15px; 
  }
  h2 { 
    border-left: 5px solid #42b983; 
    padding-left: 15px; 
    color: #2c3e50; 
    margin-bottom: 20px; 
  }
  .filter-bar { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    background: #eee; 
    padding: 12px; 
    border-radius: 10px; 
    margin-bottom: 20px; 
  }
  .custom-select { 
    padding: 6px; 
    border-radius: 5px; 
  }
  .badge { 
    font-weight: bold; 
    color: #555; 
    font-size: 0.9em; 
  }
  .empty-msg { 
    text-align: center; 
    color: #999; 
    margin-top: 30px; 
    font-style: italic; 
  }
  .item-list { 
    list-style: none; 
    padding: 0; 
  }
  .item-list li { 
    background: white; 
    margin-bottom: 10px; 
    padding: 15px; 
    border-radius: 8px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.05); 
  }
  .tag { 
    background: #42b983; 
    color: white; 
    padding: 2px 10px; 
    border-radius: 20px; 
    font-size: 0.8em; 
  }
</style>