<template>
  <div class="todo-app__input-container">
    <input
      v-model="newTask"
      placeholder="Add a new task"
      class="todo-app__task-input"
      @keyup.enter="addTask"
    />
    <button @click="addTask" class="todo-app__add-btn">
      <img src="@/assets/Plus.svg" alt="Add task" class="todo-app__btn-icon" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newTask = ref('');
const emit = defineEmits(['add-task']);

const addTask = () => {
  if (newTask.value.trim()) {
    emit('add-task', newTask.value.trim());
    newTask.value = "";
  }
};
</script>

<style scoped>
.todo-app__input-container {
  display: flex;
  font-weight: 16px;
  gap: 10px;
  margin-bottom: 24px;
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
}

.todo-app__task-input {
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

.todo-app__task-input::placeholder {
  color: #777;
}

.todo-app__add-btn {
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

.todo-app__add-btn:hover {
  background-color: #8b6bbe;
}

.todo-app__btn-icon {
  display: block;
}
</style>