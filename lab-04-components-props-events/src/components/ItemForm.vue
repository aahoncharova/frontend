<template>
  <div class="item-form card">
    <div class="input-group">
      <input v-model="newTitle" placeholder="What needs to be done?" @keyup.enter="handleAddTask">
      <button @click="handleAddTask">Add Task</button>
    </div>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return { newTitle: '', error: '' }
    },
    methods: {
      handleAddTask() {
        if (this.newTitle.trim().length < 3) {
          this.error = 'Task must be at least 3 characters long!';
          return;
        }
        this.$emit('add-task', this.newTitle);
        this.newTitle = '';
        this.error = '';
      }
    }
  };
</script>

<style scoped>
  .card { 
    background: white; 
    padding: 20px; 
    border-radius: 8px; 
    margin-bottom: 20px; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
  }
  .input-group { 
    display: flex; 
    gap: 10px; 
  }
  input { 
    flex: 1; 
    padding: 8px; 
    border: 1px solid #ddd; 
    border-radius: 4px; 
  }
  button { 
    background: #42b983;
    color: white; 
    border: none; 
    padding: 8px 15px; 
    border-radius: 4px; 
    cursor: pointer; 
  }
  .error-msg { 
    color: #e53e3e; 
    font-size: 0.85em; 
    margin-top: 10px; 
  }
</style>