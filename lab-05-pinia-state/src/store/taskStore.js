import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('my-tasks')) || [],
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
    filteredTasks(state) {
      if (state.filter === 'done') return state.tasks.filter(t => t.done)
      if (state.filter === 'active') return state.tasks.filter(t => !t.done)
      return state.tasks
    },
    totalCount: (state) => state.tasks.length,
    doneCount: (state) => state.tasks.filter(t => t.done).length,
    activeCount: (state) => state.tasks.filter(t => !t.done).length
  }
})

import { getActivePinia } from 'pinia'
let store
try {
  store = useTaskStore(getActivePinia())
} catch (e) {
  store = null
}
if (store) {
  watch(
    () => store.tasks,
    (newTasks) => {
      localStorage.setItem('my-tasks', JSON.stringify(newTasks))
    },
    { deep: true }
  )
}