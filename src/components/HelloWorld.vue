<template>
  <div class="lab-03">
    <section class="task-section">
      <h2>Task 3: Product List</h2>
      
      <div class="input-card">
        <input v-model="newProductName" placeholder="Назва товару..." class="custom-input">
        <select v-model="newProductCategory" class="custom-select">
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
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
          <span class="category-tag">{{ p.category }}</span>
          <h4>{{ p.title }}</h4>
          <button @click="removeProduct(p.id)" class="btn-del">Delete</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProductName: '',
      newProductCategory: 'Fruit',
      products: [
        { id: 1, title: 'Apple', category: 'Fruit' },
        { id: 2, title: 'Carrot', category: 'Vegetable' }
      ]
    }
  },
  methods: {
    addProduct() {
      if (!this.newProductName.trim()) return;
      this.products.push({ id: Date.now(), title: this.newProductName, category: this.newProductCategory });
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
  .input-card { 
    display: flex; 
    gap: 10px; 
    margin-bottom: 25px; 
    background: white; 
    padding: 15px; 
    border-radius: 10px; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.05); 
  }
  .custom-input { 
    flex: 2; 
    padding: 8px; 
    border: 1px solid #ddd; 
    border-radius: 5px; 
  }
  .custom-select { 
    flex: 1; 
    padding: 8px; 
    border-radius: 5px; 
  }
  .btn-add { 
    background: #2c3e50; 
    color: white; 
    padding: 8px 15px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
  }
  .product-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 15px; 
  }
  .product-card { 
    background: white; 
    padding: 15px; 
    border-radius: 10px; 
    border: 1px solid #eee; 
    position: relative; 
  }
  .highlight-fruit { 
    border: 2px solid #42b983; 
    background-color: #f0fff4; 
  }
  .category-tag { 
    font-size: 0.7em; 
    color: #888; 
    text-transform: uppercase; 
  }
  .btn-del { 
    width: 100%; 
    margin-top: 10px; 
    background: #fff0f0; 
    color: #ff6b6b; 
    border: 1px solid #ff6b6b; 
    cursor: pointer; 
    padding: 4px; 
    border-radius: 4px; 
  }
</style>