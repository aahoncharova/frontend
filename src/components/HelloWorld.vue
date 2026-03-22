<template>
  <div class="lab-03">
    <section class="task-section">
      <h2>Task 2: v-if vs v-show</h2>
      <div class="controls">
        <button @click="isPanelVisible = !isPanelVisible">Toggle Visibility</button>
      </div>

      <div v-if="isPanelVisible" class="panel panel-if">
        <strong>v-if:</strong> I delete completely from the DOM tree.
      </div>

      <div v-show="isPanelVisible" class="panel panel-show">
        <strong>v-show:</strong> I stay in the DOM, but get display: none.
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isPanelVisible: true
      }
    }
  }
</script>

<style scoped>
  .lab-03 {
    max-width: 600px;
    margin: 20px auto;
    padding: 30px;
    font-family:sans-serif;
    background-color: #f9f9f9;
    border-radius: 15px;
  }
  h2 { 
    border-left: 5px solid #42b983; 
    padding-left: 15px; 
    color: #2c3e50; 
    margin-bottom: 20px; 
  }
  .controls button { 
    width: 100%;
    padding: 10px; 
    background-color: #42b983; 
    color: white; 
    border: none; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; }
  .panel { 
    padding: 20px; 
    margin-top: 15px; 
    border-radius: 10px; 
    line-height: 1.6; 
  }
  .panel-if { 
    background-color: #e3f2fd; 
    color: #1976d2; 
    border: 1px solid #bbdefb;
  }
  .panel-show { 
    background-color: #f1f8e9; 
    color: #388e3c; 
    border: 1px solid #dcedc8; 
  }
</style>