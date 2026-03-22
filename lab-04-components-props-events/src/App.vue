<template>
  <div class="app-container">
    <h1>Vue Task Manager</h1>
    <ItemForm @add-task="addTask" />
    <ItemList 
      :tasks="tasks" 
      @toggle="toggleStatus"
      @delete="deleteTask"
    />
  </div>
</template>

<script>

import ItemForm from './components/ItemForm.vue';
import ItemList from './components/ItemList.vue';

export default {
  components: { ItemForm, ItemList },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Learn Props', completed: true },
        { id: 2, title: 'Understand Emits', completed: false },
        { id: 3, title: 'Component Communication', completed: false }
      ]
    }
  },
  methods: {
    addTask(title) {
      this.tasks.push({
        id: Date.now(),
        title,
        completed: false
      });
    },
    toggleStatus(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) task.completed = !task.completed;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }
};
</script>