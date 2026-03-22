<template>
  <div class="lab-03">
    <section class="task-section">
      <h2>Task 1: Page States</h2>
      <div class="controls">
        <button @click="isLoading = !isLoading">Toggle Loading</button>
        <button @click="hasError = !hasError">Toggle Error</button>
        <button @click="toggleItems">Toggle Items</button>
      </div>

      <div class="status-container">
        <div v-if="isLoading" class="loading">⏳ Loading...</div>
        <div v-else-if="hasError" class="error">❌ Error loading data!</div>
        <div v-else-if="items.length === 0" class="empty">📭 List is empty</div>
        <ul v-else class="item-list">
          <li v-for="(item, index) in items" :key="index">{{ item }}</li>
        </ul>
      </div>
    </section>

    <hr class="divider">

    <section class="task-section">
      <h2>Task 2: v-if vs v-show</h2>
      <div class="controls">
        <button @click="isPanelVisible = !isPanelVisible" class="btn-toggle">
          {{ isPanelVisible ? 'Hide' : 'Show' }} Panels
        </button>
      </div>

      <div v-if="isPanelVisible" class="panel panel-if">
        <strong>v-if:</strong> This element is completely <u>removed</u> from the DOM tree when hidden.
      </div>
      <div v-show="isPanelVisible" class="panel panel-show">
        <strong>v-show:</strong> This element stays in DOM, but is hidden via <u>display: none</u>.
      </div>
    </section>

    <hr class="divider">

    <section class="task-section">
      <h2>Task 3: Product List</h2>
      <div class="input-card">
        <input v-model="newProductName" @keyup.enter="addProduct" placeholder="Product name..." class="custom-input">
        <select v-model="newProductCategory" class="custom-select">
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Other">Other</option>
        </select>
        <button @click="addProduct" class="btn-add">Add</button>
      </div>

      <div class="product-grid">
        <div 
          v-for="p in products" 
          :key="p.id" 
          class="product-card"
          :class="{ 'highlight-fruit': p.category === 'Fruit' }"
        >
          <div class="card-content">
            <span class="category-badge">{{ p.category }}</span>
            <h4>{{ p.title }}</h4>
          </div>
          <button @click="removeProduct(p.id)" class="btn-delete-small">Delete</button>
        </div>
      </div>
    </section>

    <hr class="divider">

    <section class="task-section">
      <h2>Task 4: Dynamic Filtering</h2>
      <div class="filter-bar">
        <div class="filter-select">
          <label>Filter: </label>
          <select v-model="filter" class="custom-select-small">
            <option value="all">All Items</option>
            <option value="Fruit">Fruits</option>
            <option value="Vegetable">Vegetables</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="counter-badge">
          Showing <strong>{{ filteredProducts.length }}</strong> of {{ products.length }}
        </div>
      </div>

      <div class="status-container" v-if="filteredProducts.length === 0">
        <div class="empty">🔍 No products found in this category</div>
      </div>

      <ul v-else class="item-list">
        <li v-for="p in filteredProducts" :key="p.id" class="filtered-item">
          <span>{{ p.title }}</span>
          <span class="tag" :class="p.category.toLowerCase()">{{ p.category }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Lab03DynamicRendering',
  data() {
    return {
      // Task 1
      isLoading: false,
      hasError: false,
      items: [],
      
      // Task 2
      isPanelVisible: true,
      
      // Task 3
      newProductName: '',
      newProductCategory: 'Fruit',
      products: [
        { id: 1, title: 'Green Apple', category: 'Fruit' },
        { id: 2, title: 'Fresh Carrot', category: 'Vegetable' },
        { id: 3, title: 'Oat Milk', category: 'Other' }
      ],
      
      // Task 4
      filter: 'all'
    }
  },
  computed: {
    // Task 4: Filtering logic
    filteredProducts() {
      if (this.filter === 'all') return this.products;
      return this.products.filter(p => p.category === this.filter);
    }
  },
  methods: {
    // Task 1
    toggleItems() {
      this.items = this.items.length ? [] : ['Apple', 'Banana', 'Pear'];
    },
    // Task 3
    addProduct() {
      if (!this.newProductName.trim()) return;
      this.products.push({
        id: Date.now(),
        title: this.newProductName,
        category: this.newProductCategory
      });
      this.newProductName = '';
    },
    removeProduct(id) {
      this.products = this.products.filter(p => p.id !== id);
    }
  }
}
</script>

<style scoped>
.lab-03 {
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: left;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5em;
  border-left: 5px solid #42b983;
  padding-left: 15px;
}

.task-section {
  margin-bottom: 10px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.controls button {
  flex: 1;
  min-width: 120px;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.controls button:hover {
  background-color: #369970;
  transform: translateY(-1px);
}

.status-container {
  margin-top: 15px;
  padding: 25px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  min-height: 80px;
}

.loading { color: #2196f3; font-weight: bold; font-size: 1.1em; }
.error { color: #ff6b6b; font-weight: bold; font-size: 1.1em; }
.empty { color: #999; font-style: italic; }

.item-list { list-style: none; padding: 0; margin: 0; width: 100%; }
.item-list li {
  background-color: #f8f9fa;
  margin-bottom: 8px;
  padding: 12px 15px;
  border-radius: 8px;
  border-left: 4px solid #42b983;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.divider {
  margin: 40px 0;
  border: 0;
  border-top: 2px solid #eee;
}

/* Task 2 specific */
.panel { padding: 20px; margin-bottom: 10px; border-radius: 10px; line-height: 1.6; }
.panel-if { background-color: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; }
.panel-show { background-color: #f1f8e9; color: #388e3c; border: 1px solid #dcedc8; }

/* Task 3 specific */
.input-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.custom-input { flex: 2; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
.custom-select { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: white; }

.btn-add { background: #2c3e50; color: white; border: none; padding: 0 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.product-card:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.05); }

.highlight-fruit { border: 2px solid #42b983; background-color: #f0fff4; }

.category-badge { font-size: 0.7em; color: #aaa; text-transform: uppercase; font-weight: bold; }
.product-card h4 { margin: 8px 0 15px 0; color: #2c3e50; }

.btn-delete-small {
  background: #fff0f0;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8em;
}

/* Task 4 specific */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0f2f5;
  padding: 12px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.custom-select-small { padding: 5px; border-radius: 5px; border: 1px solid #ccc; }
.counter-badge { font-size: 0.85em; color: #666; }

.tag { font-size: 0.7em; padding: 3px 10px; border-radius: 20px; color: white; font-weight: bold; }
.tag.fruit { background: #42b983; }
.tag.vegetable { background: #f39c12; }
.tag.other { background: #9b59b6; }
</style>