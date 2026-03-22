<template>
  <div class="card-item" :class="{ 'is-completed': task.completed }">
    <div class="content">
      <input type="checkbox" :checked="task.completed" @change="$emit('toggle', task.id)">
      <span>{{ task.title }}</span>
    </div>
    <button @click="$emit('delete', task.id)" class="del-btn">Delete</button>
  </div>
</template>

<script>
export default { props: { task: Object } };
</script>

<style scoped>
  .card-item { 
    background: white; 
    padding: 15px; 
    margin-bottom: 10px; 
    border-radius: 6px; 
    border-left: 4px solid #42b983; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
  }
  .content {
    display: flex; 
    gap: 10px; 
    align-items: center; 
  }
  .del-btn { 
    background: #fff5f5; 
    color: #e53e3e; 
    border: 1px solid #feb2b2;
    padding: 4px 8px; 
    border-radius: 4px; 
    cursor: pointer; 
  }
  .is-completed { 
    text-decoration: line-through; 
    color: #888; 
    border-left-color: #cbd5e0; 
  }
</style>