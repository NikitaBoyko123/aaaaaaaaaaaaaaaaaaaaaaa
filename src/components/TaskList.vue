<template>
  <div>
    <div class="section-title">
      {{ title }} - {{ tasks.length }}
    </div>
    <div class="tasks-section">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="$emit('complete', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.section-title {
  color: #ffffff;
  font-size: 16px;
  margin-left: 45px;
  margin-bottom: 17px;
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
  background-color: #1e1a27;
  border-radius: 10px;
}
</style>