<template>
  <div class="todo-app" ref="container" :style="{ height: containerHeight }">
    <TaskInput @add-task="addTask" />
    
    <div ref="content">
      <TaskList
        title="Tasks to do"
        :tasks="tasksToDo"
        @complete-task="completeTask"
        @delete-task="deleteTask"
      />
      
      <TaskList
        title="Done"
        :tasks="doneTasks"
        :is-done="true"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';

const tasks = ref([
  { id: 1, text: "To study React fundamentals", completed: false },
  { id: 2, text: "To study React fundamentals", completed: false },
  { id: 3, text: "To study React fundamentals", completed: false },
  { id: 4, text: "To study React fundamentals", completed: false },
]);

const nextId = ref(5);
const containerHeight = ref('auto');
const container = ref(null);
const content = ref(null);

const tasksToDo = computed(() => tasks.value.filter(task => !task.completed));
const doneTasks = computed(() => tasks.value.filter(task => task.completed));

const checkOverflow = () => {
  nextTick(() => {
    if (!container.value || !content.value) return;
    
    const containerRect = container.value.getBoundingClientRect();
    const contentRect = content.value.getBoundingClientRect();
    
    if (contentRect.height > containerRect.height) {
      
      containerHeight.value = `${contentRect.height + 20}px`;
    } else if (containerHeight.value !== 'auto') {
     
      containerHeight.value = 'auto';
    }
  });
};


watch([tasksToDo, doneTasks], () => {
  checkOverflow();
}, { deep: true });


onMounted(() => {
  checkOverflow();
  window.addEventListener('resize', checkOverflow);
});

const addTask = (text) => {
  tasks.value.push({
    id: nextId.value++,
    text: text,
    completed: false,
  });
};

const completeTask = (id) => {
  const taskIndex = tasks.value.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.value[taskIndex].completed = true;
  }
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id);
};
</script>

<style scoped>
.todo-app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  width: 583px;
  min-height: 758px;
  margin: 109px auto;
  padding: 24px;
  background-color: #1d1825;
  border-radius: 20px;
  transition: height 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>