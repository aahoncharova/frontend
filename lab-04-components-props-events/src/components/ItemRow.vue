<template>
  <div class="card-item" :class="{ 'is-completed': task.completed }">
    <span>{{ task.title }}</span>
  </div>
</template>

<script>
  export default {
    props: { task: Object }
  };
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
  }
  .is-completed { 
    text-decoration: line-through; 
    color: #888; 
    border-left-color: #cbd5e0; 
  }
</style>