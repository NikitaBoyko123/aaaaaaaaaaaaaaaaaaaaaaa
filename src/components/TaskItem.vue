<template>
  <div class="task-item" :class="{ 'done-item': task.completed }">
    <span :class="task.completed ? 'done-text' : 'task-text'">
      {{ task.text }}
    </span>
    <div class="task-actions">
      <button 
        v-if="!task.completed"
        @click="$emit('complete', task.id)" 
        class="checkbox"
      >
        <img src="@/assets/Group1.svg" alt="Complete task" />
      </button>
      <button @click="$emit('delete', task.id)" class="delete-btn">
        <img src="@/assets/Group2.svg" alt="Delete task" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #15101c;
  padding: 22px 20px 23px;
  border-radius: 8px;
  border: 2px solid #2a2438;
  margin-bottom: 10px;
}

.task-text {
  color: #9e78cf;
  font-size: 16px;
}

.done-text {
  width: auto;
  height: 19px;
  color: #78cfb0;
  font-size: 16px;
  text-decoration: line-through;
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