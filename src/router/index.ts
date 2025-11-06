import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
import TaskDetailView from '@/views/TaskDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: TodoView
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router