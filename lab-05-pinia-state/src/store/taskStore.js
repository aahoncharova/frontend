import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    filter: 'all'

  }),
  actions: {
    addTask(title) {
      this.tasks.push({
        id: Date.now(),
        title,
        done: false
      })
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.done = !task.done
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  },
  getters: {
    filteredTasks() {
        if (this.filter === 'done') return this.tasks.filter(t => t.done)
        if (this.filter === 'active') return this.tasks.filter(t => !t.done)
        return this.tasks
    },
    totalCount: (state) => state.tasks.length,
    doneCount: (state) => state.tasks.filter(t => t.done).length,
    activeCount: (state) => state.tasks.filter(t => !t.done).length
  }
})