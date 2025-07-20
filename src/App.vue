<template>
  <div class="todo-app">
    <div class="input-container">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add a new task"
        class="task-input"
      />
      <button @click="addTask" class="add-btn"><img 
      src="@/assets/Plus.svg" 
      alt="Кнопка с картинкой" 
    /></button>
    </div>

    <div class="section-title">Tasks to do - {{ tasksToDo.length }}</div>
    <div class="tasks-section">
      <div 
        class="task-item" 
        v-for="task in tasksToDo" 
        :key="task.id"
      >
        <span class="task-text">{{ task.text }}</span>
        <div class="task-actions">
          <button @click="completeTask(task.id)" class="checkbox"><img 
      src="@/assets/Group1.svg" 
      alt="Кнопка с картинкой" 
    /></button>
          <button @click="deleteTask(task.id)" class="delete-btn"><img 
      src="@/assets/Group2.svg" 
      alt="Кнопка с картинкой" 
    /></button>
        </div>
      </div>
    </div>

    <div class="section-title" style="margin-top: 50px;">Done - {{ doneTasks.length }}</div>
    <div class="tasks-section">
      <div 
        class="task-item done-item" 
        v-for="task in doneTasks" 
        :key="task.id"
      >
        <span class="done-text">{{ task.text }}</span>
        <button @click="deleteTask(task.id)" class="delete-btn"><img 
      src="@/assets/Group2.svg" 
      alt="Кнопка с картинкой" 
      class="button-image"
    /></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: [
        { id: 1, text: 'To study React fundamentals', completed: false },
        { id: 2, text: 'To study React fundamentals', completed: false },
        { id: 3, text: 'To study React fundamentals', completed: false },
        { id: 4, text: 'To study React fundamentals', completed: false },
      ],
      nextId: 5
    };
  },
  computed: {
    tasksToDo() {
      return this.tasks.filter(task => !task.completed);
    },
    doneTasks() {
      return this.tasks.filter(task => task.completed);
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({
          id: this.nextId++,
          text: this.newTask.trim(),
          completed: false,
        });
        this.newTask = '';
      }
    },
    completeTask(id) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].completed = true;
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
  },
};
</script>

<style scoped>
.todo-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  width: 583px;
  height: 758px;
  margin: 109px auto;
  padding: 24px;
  background-color: #1D1825;
  border-radius: 10px;
  color: #FFFFFF;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
}

.task-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #9E78CF;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  background-color: #15101C;
  color: #FFFFFF;
  height: 40px;
  width: 381px;
}

.task-input::placeholder {
  color: #777;
}

.add-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 8px;
  background-color: #9E78CF;
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
  background-color: #8B6BBE;
}

.section-title {
  color: #FFFFFF;
  font-size: 16px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 400;
  height: 19px;
  width: 114px;
}

.tasks-section {
  width: 432px;
  background-color: #15101C;
  border-radius: 8px;
  padding: 16px;
  margin: auto;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #2A2438;
}

.task-item:last-child {
  border-bottom: none;
}

.task-text {
  color: #9E78CF;
  font-size: 14px;
}

.done-text {
  width: 64px;
  height: 19px;
  color: #78CFB0;
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
  border: 1px solid #3E3546;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #9E78CF;
  padding: 0;
}

.checkbox:hover {
  border-color: #9E78CF;
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
  font-size: 16px;
  color: #777;
  padding: 0;
}

.delete-btn:hover {
  color: #FF5555;
  background-color: rgba(255, 85, 85, 0.1);
}

</style>