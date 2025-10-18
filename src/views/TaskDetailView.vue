<template>
  <div class="task-detail">
    <div class="task-detail-container">
      <router-link to="/" class="back-link"> ← Назад к списку </router-link>

      <div v-if="loading" class="loading">
        Loading task details from JSONPlaceholder...
      </div>

      <div v-else-if="error" class="error">
        <h3>Error Loading Task</h3>
        <p>{{ error }}</p>
        <p>Try refreshing the page or check the console for details.</p>
      </div>

      <div v-else-if="task" class="task-content">
        <h1 class="task-title">Task #{{ task.id }}</h1>

        <div
          class="task-card"
          :class="{ 'task-card--completed': task.completed }"
        >
          <div class="task-status">
            <span class="status-badge" :class="statusBadgeClass">
              {{ statusText }}
            </span>
          </div>

          <p class="task-text">{{ task.title }}</p>

          <div class="task-meta">
            <span class="task-user">User ID: {{ task.userId }}</span>
            <span class="task-source">Source: JSONPlaceholder</span>
          </div>
        </div>

        <div class="task-info">
          <h3 class="task-info__title">Task Details:</h3>
          <ul class="task-info__list">
            <li class="task-info__item">
              <span class="task-info__label">ID:</span> {{ task.id }}
            </li>
            <li class="task-info__item">
              <span class="task-info__label">Title:</span> {{ task.title }}
            </li>
            <li class="task-info__item">
              <span class="task-info__label">Status:</span>
              {{ task.completed ? "Completed" : "Not Completed" }}
            </li>
            <li class="task-info__item">
              <span class="task-info__label">User ID:</span> {{ task.userId }}
            </li>
            <li class="task-info__item">
              <span class="task-info__label">API Source:</span> JSONPlaceholder
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="not-found">
        <h2 class="not-found__title">Task Not Found</h2>
        <p>Unable to load task with ID: {{ $route.params.id }}</p>
        <p>Possible reasons:</p>
        <ul class="not-found__list">
          <li class="not-found__item">Network connection issue</li>
          <li class="not-found__item">JSONPlaceholder API is down</li>
          <li class="not-found__item">Invalid task ID</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { todosApi } from "@/api/todos";

const route = useRoute();
const task = ref(null);
const loading = ref(false);
const error = ref(null);

const statusText = computed(() => {
  return task.value?.completed ? "Completed" : "In Progress";
});

const statusBadgeClass = computed(() => {
  return {
    "status-badge--todo": !task.value?.completed,
    "status-badge--done": task.value?.completed,
  };
});

const fetchTodoById = async (id) => {
  loading.value = true;
  error.value = null;
  task.value = null;

  try {
    const response = await todosApi.getTodoById(id);
    task.value = response.data;
  } catch (err) {
    error.value = `Failed to load task: ${err.message}`;
    console.error("Error fetching todo:", err);
  } finally {
    loading.value = false;
  }
};

const loadTask = async () => {
  const taskId = parseInt(route.params.id);

  if (taskId && taskId >= 1) {
    await fetchTodoById(taskId);
  } else {
    error.value = `Invalid task ID: ${taskId}. Task ID must be a positive number.`;
    task.value = null;
  }
};

onMounted(loadTask);
watch(() => route.params.id, loadTask);
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

.loading,
.error {
  text-align: center;
  color: #ffffff;
  padding: 40px;
  background-color: #1d1825;
  border-radius: 20px;
  border: 2px solid #2a2438;
  margin-bottom: 20px;
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
}

.task-title {
  color: #9e78cf;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.task-card {
  background-color: #15101c;
  padding: 30px;
  border-radius: 12px;
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
  font-size: 30;
  background-color: #9e78cf;
  color: white;
}

.status-badge--done {
  background-color: #78cfb0;
  color: white;
}

.task-text {
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 14px;
}

.task-info {
  background-color: #15101c;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.task-info__title {
  display: flex;
  justify-content: center;
  color: #9e78cf;
  margin-bottom: 15px;
  font-size: 32px;
  font-weight: 700;
}

.task-info__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-info__item {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  padding: 8px 0;
  border-bottom: 1px solid #2a2438;
}

.task-info__item:last-child {
  border-bottom: none;
}

.task-info__label {
  color: #9e78cf;
  font-weight: 500;
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
