<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input v-model="newTask" placeholder="Add new task..." />
    <button>Add</button>
  </form>
</template>

<script>
import { useTaskStore } from '../store/taskStore'

export default {
  data: () => ({ newTask: '' }),
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  },
  methods: {
    handleSubmit() {
      if (this.newTask.length > 2) {
        this.taskStore.addTask(this.newTask)
        this.newTask = ''
      }
    }
  }
}
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.task-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
}
.task-form button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.2s;
}
.task-form button:hover {
  background: #369970;
}
</style>