<template>
  <div class="stats">
    <p>Total: {{ taskStore.totalCount }} | Done: {{ taskStore.doneCount }} | Active: {{ taskStore.activeCount }}</p>
    <div class="filters">
      <button @click="taskStore.filter = 'all'">All</button>
      <button @click="taskStore.filter = 'active'">Active</button>
      <button @click="taskStore.filter = 'done'">Done</button>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../store/taskStore'
export default {
  setup() { return { taskStore: useTaskStore() } }
}
</script>
<style scoped>
.stats {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  padding: 18px 20px;
  margin-bottom: 20px;
  text-align: center;
}
.stats p {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 1.1em;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.filters button {
  padding: 7px 18px;
  border: 1px solid #42b983;
  background: transparent;
  color: #42b983;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  transition: 0.2s;
}
.filters button:hover {
  background: #42b983;
  color: #fff;
}
</style>