<template>
  <div class="input-container">
    <input
      v-model="taskText"
      placeholder="Add a new task"
      class="task-input"
      @keyup.enter="handleAddTask"
    />
    <button @click="handleAddTask" class="add-btn">
      <img src="@/assets/Plus.svg" alt="Add task" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskText: ""
    };
  },
  methods: {
    handleAddTask() {
      if (this.taskText.trim()) {
        this.$emit('add', this.taskText.trim());
        this.taskText = '';
      }
    }
  }
};
</script>

<style scoped>
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
</style>