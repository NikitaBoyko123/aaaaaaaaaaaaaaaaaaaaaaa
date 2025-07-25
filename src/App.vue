<template>
  <div class="todo-app">
    <TaskInput @add="addTask" />
    
    <TaskList
      title="Tasks to do"
      :tasks="tasksToDo"
      @complete="completeTask"
      @delete="deleteTask"
    />
    
    <TaskList
      title="Done"
      :tasks="doneTasks"
      @delete="deleteTask"
    />
  </div>
</template>

<script>
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskInput,
    TaskList
  },
  data() {
    return {
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
    addTask(text) {
      this.tasks.push({
        id: this.nextId++,
        text: text,
        completed: false,
      });
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
  margin: 109px auto;
  padding: 24px;
  background-color: #1d1825;
  border-radius: 20px;
}
</style>