<template>
  <div>
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

<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { LocalTodo } from '@/types/todo'

defineProps<{
  tasks: LocalTodo[]
  title: string
  isDone?: boolean
}>()

defineEmits<{
  (e: 'complete-task', id: number): void
  (e: 'delete-task', id: number): void
}>()
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