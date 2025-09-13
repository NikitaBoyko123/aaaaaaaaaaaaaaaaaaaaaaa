<template>
  <div class="todo-app__section">
    <div class="todo-app__section-title">{{ title }} - {{ tasks.length }}</div>
    <div class="todo-app__tasks-section">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :is-done="isDone"
        @complete-task="$emit('complete-task', task.id)"
        @delete-task="$emit('delete-task', task.id)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue';

defineProps({
  tasks: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

defineEmits(['complete-task', 'delete-task']);
</script>

<style scoped>
.todo-app__section-title {
  color: #ffffff;
  font-size: 16px;
  margin-left: 45px;
  margin-top: 59px;
  margin-bottom: 17px;
  font-weight: 400;
  height: 19px;
  width: 114px;
}

.todo-app__tasks-section {
  width: 500px;
  padding: 15px 20px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: white;
  border-radius: 10px;
}
</style>