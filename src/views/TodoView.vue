<template>
  <div class="todo-app">
    <div class="input-container">
      <input
        v-model="newTask"
        placeholder="Add a new task"
        class="task-input"
        @keyup.enter="addTask"
      />
      <button @click="addTask" class="add-btn">
        <img src="@/assets/Plus.svg" alt="Кнопка с картинкой" />
      </button>
    </div>

    <div v-if="loading" class="loading">
      Loading todos from JSONPlaceholder...
    </div>

    <div v-if="error" class="error">
      Error: {{ error }}
    </div>

    <div class="section-title-tasks">Tasks to do - {{ tasksToDo.length }}</div>
    <div class="tasks-section">
      <div v-if="tasksToDo.length === 0 && !loading" class="empty-state">
        No tasks to do. Add a new task above!
      </div>
      <div class="task-item" v-for="task in tasksToDo" :key="task.id">
        <router-link 
          :to="`/task/${task.id}`"
          class="task-text"
        >
          {{ task.title }}
        </router-link>
        <div class="task-actions">
          <button @click="completeTask(task.id)" class="checkbox">
            <img src="@/assets/Group1.svg" alt="Кнопка с картинкой" />
          </button>
          <button @click="deleteTask(task.id)" class="delete-btn">
            <img src="@/assets/Group2.svg" alt="Кнопка с картинкой" />
          </button>
        </div>
      </div>
    </div>

    <div class="section-title-done">
      Done - {{ doneTasks.length }}
    </div>
    <div class="tasks-section">
      <div v-if="doneTasks.length === 0 && !loading" class="empty-state">
        No completed tasks yet.
      </div>
      <div v-for="task in doneTasks" class="task-item done-item" :key="task.id">
        <router-link 
          :to="`/task/${task.id}`"
          class="done-text"
        >
          {{ task.title }}
        </router-link>
        <button @click="deleteTask(task.id)" class="delete-btn">
          <img
            src="@/assets/Group2.svg"
            alt="Кнопка с картинкой"
            class="button-image"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { todosApi } from '@/api/todos'

const todos = ref([])
const loading = ref(false)
const error = ref(null)
const newTask = ref('')

const fetchTodos = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await todosApi.getAllTodos()
    const serverTodos = response.data.slice(0, 10)
    
    todos.value = serverTodos.map(task => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      userId: task.userId,
      _original: task
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching todos from JSONPlaceholder:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTodos()
})

const tasksToDo = computed(() => todos.value.filter(task => !task.completed))
const doneTasks = computed(() => todos.value.filter(task => task.completed))

const addTask = () => {
  if (newTask.value.trim()) {
    const newId = Math.max(...todos.value.map(t => t.id), 0) + 1
    todos.value.push({
      id: newId,
      title: newTask.value.trim(),
      completed: false,
      userId: 1 
    })
    newTask.value = ""
  }
}

const completeTask = (id) => {
  const taskIndex = todos.value.findIndex(task => task.id === id)
  if (taskIndex !== -1) {
    todos.value[taskIndex].completed = true
  }
}

const deleteTask = (id) => {
  todos.value = todos.value.filter(task => task.id !== id)
}
</script>

<style scoped>
.empty-state {
  text-align: center;
  color: #777;
  padding: 20px;
}

.todo-app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  width: 583px;
  min-height: 758px;
  height: auto;
  margin: 0 auto;
  padding: 24px;
  background-color: #1d1825;
  border-radius: 20px;
  transition: min-height 0.3s ease;
}

.loading, .error {
  text-align: center;
  color: #ffffff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.loading {
  background-color: #9e78cf;
}

.error {
  background-color: #ff5555;
}

.input-container {
  display: flex;
  font-weight: 16px;
  gap: 10px;
  margin-bottom: 24px;
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
}

.task-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #9e78cf;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  background-color: #15101c;
  color: #ffffff;
  height: 40px;
}

.task-input::placeholder {
  color: #777;
}

.add-btn {
  width: 42px;
  height: 41px;
  border: none;
  border-radius: 8px;
  background-color: #9e78cf;
  color: white;
  font-size: 24px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #8b6bbe;
}

.section-title-tasks {
  color: #ffffff;
  font-size: 16px;
  margin-left: 45px;
  margin-top: 59px;
  margin-bottom: 17px;
  font-weight: 400;
  height: 19px;
  width: 114px;
}

.section-title-done {
  color: #ffffff;
  font-size: 16px;
  margin-left: 45px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 400;
  height: 19px;
  width: 114px;
}

.tasks-section {
  width: 500px;
  padding: 15px 20px;
  margin: auto;
  font-family: Arial, sans-serif;
  color: white;
  border-radius: 10px;
  height: auto;
  min-height: auto;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #15101c;
  padding: 22px 20px 23px;
  border-radius: 8px;
  margin-bottom: 10px;
  height: 67px;
  box-sizing: border-box;
}

.task-item:last-child {
  margin-bottom: 0;
}

.task-text {
  color: #9e78cf;
  font-size: 16px;
  text-decoration: none;
  flex: 1;
}

.task-text:hover {
  opacity: 0.8;
}

.done-text {
  width: auto;
  height: 19px;
  color: #78cfb0;
  font-size: 16px;
  text-decoration: line-through;
  flex: 1;
}

.done-text:hover {
  opacity: 0.8;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #3e3546;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;
  justify-content: center;
  font-size: 14px;
  color: #9e78cf;
  padding: 0;
}

.checkbox:hover {
  border-color: #9e78cf;
  background-color: rgba(158, 120, 207, 0.1);
}

.delete-btn {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  padding: 0;
}

.delete-btn:hover {
  color: #ff5555;
  background-color: rgba(255, 85, 85, 0.1);
}
</style>