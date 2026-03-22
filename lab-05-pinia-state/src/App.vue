<template>
  <div class="app-container">
    <h1>Pinia Task Manager</h1>
    <TaskForm />
    <TaskList />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  components: {
    TaskForm,
    TaskList
  }
}
</script>

<style>
.app-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>