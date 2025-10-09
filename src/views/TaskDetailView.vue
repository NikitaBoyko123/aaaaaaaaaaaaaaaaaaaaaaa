<template>
  <div class="task-detail">
    <div class="task-detail-container">
      <router-link to="/" class="back-link">
        ← Назад к списку
      </router-link>
      
      <div v-if="loading" class="loading">
        Loading task details from JSONPlaceholder...
      </div>

      <div v-else-if="error" class="error">
        Error: {{ error }}
      </div>

      <div v-else-if="task" class="task-content">
        <h1 class="task-title">Task #{{ task.id }}</h1>
        
        <div class="task-card" :class="{ 'task-card--completed': task.completed }">
          <div class="task-status">
            <span class="status-badge" :class="{
              'status-badge--todo': !task.completed,
              'status-badge--done': task.completed
            }">
              {{ task.completed ? 'Completed' : 'In Progress' }}
            </span>
          </div>
          
          <p class="task-text">{{ task.title }}</p>
          
          <div class="task-meta">
            <span class="task-user">User ID: {{ task.userId }}</span>
            <span class="task-source">Source: JSONPlaceholder</span>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Task not found</h2>
        <p>Task with ID {{ $route.params.id }} does not exist in JSONPlaceholder.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { todosApi } from '@/api/todos'

const route = useRoute()
const task = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchTodoById = async (id) => {
  loading.value = true
  error.value = null
  try {
    const response = await todosApi.getTodoById(id)
    task.value = response.data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching todo from JSONPlaceholder:', err)
  } finally {
    loading.value = false
  }
}

const loadTask = async () => {
  const taskId = parseInt(route.params.id)
  if (taskId) {
    await fetchTodoById(taskId)
  }
}

onMounted(loadTask)
watch(() => route.params.id, loadTask)
</script>

<style scoped>
.task-detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.task-detail-container {
  max-width: 600px;
  width: 100%;
}

.back-link {
  display: inline-block;
  color: #9e78cf;
  text-decoration: none;
  padding: 10px 20px;
  margin-bottom: 30px;
  border: 2px solid #9e78cf;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-link:hover {
  background-color: #9e78cf;
  color: #ffffff;
}

.loading, .error {
  text-align: center;
  color: #ffffff;
  padding: 40px;
  background-color: #1d1825;
  border-radius: 20px;
  border: 2px solid #2a2438;
}

.loading {
  background-color: #1d1825;
}

.error {
  background-color: #1d1825;
  color: #ff5555;
}

.task-content {
  background-color: #1d1825;
  padding: 40px;
  border-radius: 20px;
  border: 2px solid #2a2438;
}

.task-title {
  color: #9e78cf;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
}

.task-card {
  background-color: #15101c;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #2a2438;
  margin-bottom: 30px;
}

.task-card--completed {
  border-color: #78cfb0;
}

.task-status {
  margin-bottom: 20px;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status-badge--todo {
  background-color: #9e78cf;
  color: white;
}

.status-badge--done {
  background-color: #78cfb0;
  color: white;
}

.task-text {
  color: #ffffff;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 14px;
}

.not-found {
  background-color: #1d1825;
  padding: 40px;
  border-radius: 20px;
  border: 2px solid #2a2438;
  text-align: center;
  color: #ffffff;
}
</style>