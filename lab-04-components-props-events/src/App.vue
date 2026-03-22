<template>
  <div class="app-container">
    <h1>Vue Task Manager</h1>
    <ItemForm />
    <ItemList :tasks="tasks" />
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
    }
  }
  };
</script>