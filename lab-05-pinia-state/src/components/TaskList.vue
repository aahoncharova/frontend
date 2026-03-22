<template>
  <div class="task-list">
    <div v-for="task in taskStore.tasks" :key="task.id" class="task-item">
      <span :class="{ done: task.done }">{{ task.title }}</span>
      <button @click="taskStore.toggleTask(task.id)">Check</button>
      <button @click="taskStore.removeTask(task.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../store/taskStore'
export default {
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  }
}
</script>

<style scoped>
.task-list {
  margin-top: 10px;
}
.task-item {
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  padding: 12px 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.task-item .done {
  text-decoration: line-through;
  color: #888;
}
.task-item button {
  background: #f1f1f1;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s;
}
.task-item button:hover {
  background: #ffe0e0;
  color: #e53e3e;
}
</style>