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

    <div class="section-title-tasks">Tasks to do - {{ tasksToDo.length }}</div>
    <div class="tasks-section">
      <div class="task-item" v-for="task in tasksToDo" :key="task.id">
        <span class="task-text">{{ task.text }}</span>
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
      <div v-for="task in doneTasks" class="task-item done-item" :key="task.id">
        <span class="done-text">{{ task.text }}</span>
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

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: [
        { id: 1, text: "To study React fundamentals", completed: false },
        { id: 2, text: "To study React fundamentals", completed: false },
        { id: 3, text: "To study React fundamentals", completed: false },
        { id: 4, text: "To study React fundamentals", completed: false },
      ],
      nextId: 5,
    };
  },
   computed: {
    tasksToDo() {
      return this.tasks.filter((task) => !task.completed);
    },
    doneTasks() {
      return this.tasks.filter((task) => task.completed);
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
        this.newTask = "";
      }
    },
    completeTask(id) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].completed = true;
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
};
</script>

<style scoped>
.todo-app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  width: 583px;
  height: 758px;
  margin: 0 auto;
  padding: 24px;
  background-color: #1d1825;
  border-radius: 20px;
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
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #15101c;
  padding: 22px 20px 23px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.task-item:last-child {
  border-bottom: none;
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

.task-input:focus {
  border: 1px solid #9e78cf;
  outline: none;
}
</style>