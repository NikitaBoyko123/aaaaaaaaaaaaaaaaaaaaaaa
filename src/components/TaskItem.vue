<template>
  <div class="todo-app__task-item" :class="{ 'todo-app__task-item--done': isDone }">
    <router-link 
      :to="`/task/${task.id}`"
      class="todo-app__task-link"
      :class="isDone ? 'todo-app__task-text--done' : 'todo-app__task-text'"
    >
      {{ task.text }}
    </router-link>
    <div class="todo-app__task-actions">
      <button
        v-if="!isDone"
        @click="$emit('complete-task')"
        class="todo-app__checkbox"
      >
        <img src="@/assets/Group1.svg" alt="Complete task" class="todo-app__btn-icon" />
      </button>
      <button @click="$emit('delete-task')" class="todo-app__delete-btn">
        <img src="@/assets/Group2.svg" alt="Delete task" class="todo-app__btn-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocalTodo } from '@/types/todo'

defineProps<{
  task: LocalTodo
  isDone: boolean
}>()

defineEmits<{
  (e: 'complete-task'): void
  (e: 'delete-task'): void
}>()
</script>

<style scoped>
.todo-app__task-item {
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

.todo-app__task-link {
  text-decoration: none;
  flex: 1;
  cursor: pointer;
  transition: color 0.3s ease;
}

.todo-app__task-link:hover {
  opacity: 0.8;
}

.todo-app__task-text {
  color: #9e78cf;
  font-size: 16px;
}

.todo-app__task-text--done {
  width: auto;
  height: 19px;
  color: #78cfb0;
  font-size: 16px;
  text-decoration: line-through;
}

.todo-app__task-actions {
  display: flex;
  gap: 8px;
}

.todo-app__checkbox {
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

.todo-app__checkbox:hover {
  border-color: #9e78cf;
  background-color: rgba(158, 120, 207, 0.1);
}

.todo-app__delete-btn {
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

.todo-app__delete-btn:hover {
  color: #ff5555;
  background-color: rgba(255, 85, 85, 0.1);
}

.todo-app__btn-icon {
  display: block;
}
</style>